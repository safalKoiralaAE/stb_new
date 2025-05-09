import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DeleteProfileConfirmation = ({ isOpen, onClose, profileName, onConfirm }) => {
  return (
    <Modal show={isOpen} size="md" popup onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete the profile
            {profileName && <span className="font-semibold"> "{profileName}"</span>}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm}>
              Yes, delete profile
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            This action cannot be undone. All profile settings and viewing history will be permanently removed.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProfileConfirmation;
