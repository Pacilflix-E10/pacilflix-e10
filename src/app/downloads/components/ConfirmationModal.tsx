import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onClose,
  message,
  onConfirm,
}) => {
  return (
    <>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-xl p-6 border-2">
              <div className="mb-4">{message}</div>
              <div className="flex justify-center">
                <button
                  className="btn btn-error w-full px-4 py-2"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;