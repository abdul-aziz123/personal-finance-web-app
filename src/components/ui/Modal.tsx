import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-md bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-black hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
