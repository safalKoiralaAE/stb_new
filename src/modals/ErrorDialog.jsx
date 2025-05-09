import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ErrorDialog = ({ isOpen, onClose, title, message, errorCode, retryAction }) => {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />
          <h3 className="mb-5 text-lg font-normal text-gray-800">
            {title || 'Playback Error'}
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            {message || 'There was an error playing this content.'}
          </p>
          {errorCode && (
            <p className="mb-5 text-xs text-gray-500">
              Error code: {errorCode}
            </p>
          )}
          <div className="flex justify-center gap-4">
            {retryAction && (
              <Button color="blue" onClick={retryAction}>
                Retry
              </Button>
            )}
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorDialog;
