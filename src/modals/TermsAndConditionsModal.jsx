import React from 'react';
import { Modal, Button, Checkbox, Label } from 'flowbite-react';
import { HiOutlineDocumentText } from 'react-icons/hi';

const TermsAndConditionsModal = ({ show, onAccept, onDecline, onClose }) => {
  const [isAgreed, setIsAgreed] = React.useState(false);

  const handleAgreeChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <Modal
      show={show}
      size="md"
      onClose={onClose}
      popup
    >
      <Modal.Header className="border-b border-gray-200 !p-6">
        <div className="flex items-center gap-2">
          <HiOutlineDocumentText className="h-6 w-6 text-gray-600" />
          <h3 className="text-xl font-medium text-gray-900">Terms and Conditions</h3>
        </div>
      </Modal.Header>
      <Modal.Body className="!p-6">
        <div className="max-h-60 overflow-y-auto mb-4">
          <h4 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h4>
          <p className="text-sm text-gray-600 mb-3">
            By accessing or using our mobile application, you agree to be bound by these Terms and Conditions and our Privacy Policy.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">2. User Accounts</h4>
          <p className="text-sm text-gray-600 mb-3">
            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">3. Privacy</h4>
          <p className="text-sm text-gray-600 mb-3">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">4. Content</h4>
          <p className="text-sm text-gray-600 mb-3">
            You retain ownership of any content you submit, post, or display on or through our service. By submitting content, you grant us a license to use it.
          </p>
          
          <h4 className="text-lg font-semibold mb-2">5. Prohibited Activities</h4>
          <p className="text-sm text-gray-600 mb-3">
            You may not engage in any activity that interferes with or disrupts the services or servers and networks connected to the services.
          </p>
        </div>
        
        <div className="flex items-start mb-4">
          <Checkbox
            id="agree"
            checked={isAgreed}
            onChange={handleAgreeChange}
            className="mt-1"
          />
          <Label htmlFor="agree" className="ml-2 text-sm text-gray-700">
            I have read and agree to the Terms and Conditions and Privacy Policy
          </Label>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button color="gray" onClick={onDecline}>
            Decline
          </Button>
          <Button
            color="blue"
            onClick={onAccept}
            disabled={!isAgreed}
          >
            Accept
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TermsAndConditionsModal;
