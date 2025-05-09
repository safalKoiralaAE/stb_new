import React, { useState } from 'react';
import { Modal, TextInput, Button, Label } from 'flowbite-react';
import { HiOutlineMail } from 'react-icons/hi';

const ForgotPasswordModal = ({ show, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Here you would typically have your API call to request password reset
      await onSubmit(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Modal show={show} size="md" popup onClose={handleClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Reset your password
          </h3>
          {success ? (
            <div className="text-sm text-green-600">
              <p>Password reset link has been sent to your email.</p>
              <p className="mt-2">Please check your inbox and follow the instructions.</p>
              <div className="mt-4">
                <Button color="gray" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  icon={HiOutlineMail}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password.
              </div>
              <div className="flex justify-between gap-4">
                <Button color="gray" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !email}>
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
