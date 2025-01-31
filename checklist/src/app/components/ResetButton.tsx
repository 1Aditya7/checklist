// app/components/ResetButton.tsx
"use client";

import { useState } from "react";
import { useRulesStore } from "../store/useRulesStore";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

const ResetButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetRules = useRulesStore((state) => state.resetRules);

  // Reset button logic
  const handleReset = () => {
    // Open the confirmation modal
    setIsModalOpen(true);
  };

  // Confirm reset (call the reset function)
  const confirmReset = () => {
    resetRules(); // Reset all rules
    localStorage.removeItem("checkedRules"); // Clear progress from localStorage
    window.location.reload(); // Reload the page to reflect the reset
  };

  // Cancel reset (close the modal)
  const cancelReset = () => {
    setIsModalOpen(false); // Close the modal without resetting
  };

  return (
    <div>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Reset Progress
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal onConfirm={confirmReset} onCancel={cancelReset} />
      )}
    </div>
  );
};

export default ResetButton;
