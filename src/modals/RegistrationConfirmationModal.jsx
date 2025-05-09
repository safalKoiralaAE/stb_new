import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineMailOpen, HiOutlineCheckCircle } from 'react-icons/hi';

const RegistrationConfirmationModal = ({ isOpen, onClose, userEmail, onResendEmail }) => {
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header className="border-b border-gray-200 !p-6">
        <div className="flex items-center">
          <HiOutlineCheckCircle className="mr-2 h-6 w-6 text-green-500" />
          <span className="text-lg font-medium">Registration Successful</span>
        </div>
      </Modal.Header>
      <Modal.Body className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-blue-100 p-3">
            <HiOutlineMailOpen className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">Verify your email address</h3>
          <p className="mb-4 text-gray-700">
            We've sent a verification email to:
            <span className="mt-1 block font-medium text-blue-600">{userEmail || 'your email address'}</span>
          </p>
          <p className="text-sm text-gray-600">
            Please check your inbox and click on the verification link to complete your registration.
            If you don't see the email, check your spam folder.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between border-t border-gray-200 !p-6">
        <Button color="light" onClick={onClose}>
          Close
        </Button>
        <Button color="blue" onClick={onResendEmail}>
          Resend Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationConfirmationModal;
