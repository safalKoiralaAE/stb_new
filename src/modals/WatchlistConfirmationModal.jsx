import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

const WatchlistConfirmationModal = ({ show, onClose, onConfirm, contentTitle = "this content" }) => {
  return (
    <Modal show={show} onClose={onClose} size="sm" popup>
      <Modal.Header className="px-6 pt-5 pb-0">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body className="px-6 py-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add to Watchlist
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to add <span className="font-medium">{contentTitle}</span> to your watchlist?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              color="light"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              color="dark"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full"
            >
              <HiOutlineCheck className="mr-2 h-5 w-5" />
              Add
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WatchlistConfirmationModal;
