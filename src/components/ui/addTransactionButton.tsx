import React from "react";

interface AddTransactionButtonProps {
  onClick: () => void;
}

export function AddTransactionButton({ onClick }: AddTransactionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
    >
      + Add New Transaction
    </button>
  );
}
