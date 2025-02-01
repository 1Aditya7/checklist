"use client";

import { useState } from "react";
import { useRulesStore } from "../store/useRulesStore";
import ConfirmationModal from "./ConfirmationModal";
import { Button } from "@/components/ui/button"; // Using ShadCN Button

const ResetButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetRules = useRulesStore((state) => state.resetRules);

  const handleReset = () => {
    setIsModalOpen(true); // Open the modal
  };

  const confirmReset = () => {
    resetRules();
    localStorage.removeItem("checkedRules");
    window.location.reload();
  };

  return (
    <div>
      <Button variant="outline" onClick={handleReset} className="bg-red-500 text-white hover:bg-red-600">
        Reset Progress
      </Button>

      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={confirmReset}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ResetButton;
