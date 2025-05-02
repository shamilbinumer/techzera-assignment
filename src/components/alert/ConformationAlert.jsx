import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { BiErrorCircle } from 'react-icons/bi';

const ConfirmationAlert = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to proceed?",
  title = "Confirmation",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning" // Can be "warning", "error", "info"
}) => {
  if (!isOpen) return null;



  // const { icon, buttonColor, iconBg } = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-down">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl text-center font-bold text-gray-800">{title}</h2>

        <div className="py-3 text-gray-600 text-center">
          {message}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 bg-gradient-to-br bg-gray-600 text-white rounded-lg hover:opacity-90 transition-all font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;