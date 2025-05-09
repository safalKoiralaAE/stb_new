import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Label } from 'flowbite-react';
import { HiLockClosed, HiX } from 'react-icons/hi';

const PinEntryModal = ({ isOpen, onClose, onPinSubmit, title = 'Enter PIN', description = 'Please enter your PIN to continue', errorMessage = null, maxAttempts = 3 }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(errorMessage);
  const inputRefs = useRef([]);

  // Reset pin when modal opens
  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '']);
      setError(null);
      // Focus the first input when modal opens
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Update error message from props
  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handlePinChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus to next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const fullPin = pin.join('');
    if (fullPin.length === 4) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      onPinSubmit(fullPin, newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setError(`Maximum ${maxAttempts} attempts reached. Please try again later.`);
      }
    } else {
      setError('Please enter a complete 4-digit PIN');
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header className="border-b border-gray-200 !p-6">
        <div className="flex items-center">
          <HiLockClosed className="mr-2 h-6 w-6 text-gray-600" />
          {title}
        </div>
      </Modal.Header>
      <Modal.Body className="p-6">
        <div className="space-y-6">
          <p className="text-base text-gray-500">{description}</p>
          
          <div className="flex justify-center space-x-3">
            {pin.map((digit, index) => (
              <div key={index} className="w-14">
                <input
                  type="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-center text-lg font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  aria-label={`PIN digit ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
          
          {attempts > 0 && attempts < maxAttempts && (
            <div className="text-sm text-gray-500 text-center">
              Attempt {attempts} of {maxAttempts}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={pin.some(digit => !digit)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PinEntryModal;
