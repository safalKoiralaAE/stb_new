import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const LoginErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      popup={true}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Login Error
          </h3>
          <p className="mb-5 text-sm text-gray-700">
            {errorMessage || 'An error occurred while trying to log in. Please try again.'}
          </p>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onClose}>
              OK
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginErrorModal;