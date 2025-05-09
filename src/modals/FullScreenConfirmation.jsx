import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { HiX, HiInformationCircle } from 'react-icons/hi';

const FullScreenConfirmation = ({ isFullScreen, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide the confirmation after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleDismiss = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300">
      <Alert
        color={"info"}
        icon={HiInformationCircle}
        onDismiss={handleDismiss}
        className="max-w-md"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">
            {isFullScreen ? "Entered Fullscreen Mode" : "Exited Fullscreen Mode"}
          </h3>
          <p>
            {isFullScreen
              ? "Press Esc or F11 to exit fullscreen"
              : "Press F11 to enter fullscreen again"}
          </p>
          <div className="flex justify-end mt-2">
            <Button size="xs" color="light" onClick={handleDismiss}>
              <HiX className="mr-1" /> Dismiss
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default FullScreenConfirmation;
