"use client";

import { create } from "zustand";
import { rules } from "../data/rules"; // Assuming 'rules' is your initial set of data

// Type Definitions
type Rule = {
  id: string;
  rulebook: string;
  category: string;
  rule: string;
  interpretation: string;
  checked: boolean;
};

type RulesState = {
  rules: Rule[];
  toggleRule: (id: string) => void;
  resetRules: () => void; // New method to reset rules
};

// Load saved rules from localStorage (or use default rules)
const getSavedRules = (): Rule[] => {
  if (typeof window !== "undefined") {
    const storedRules = localStorage.getItem("fs-rules");
    return storedRules ? JSON.parse(storedRules) : rules;
  }
  return rules; // Default rules (for SSR safety)
};

// Zustand Store with Persistence
export const useRulesStore = create<RulesState>((set) => ({
  rules: getSavedRules(),
  
  toggleRule: (id) => {
    set((state) => {
      const updatedRules = state.rules.map((rule) =>
        rule.id === id ? { ...rule, checked: !rule.checked } : rule
      );

      // Save updated rules to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("fs-rules", JSON.stringify(updatedRules));
      }

      return { rules: updatedRules };
    });
  },

  resetRules: () => {
    set(() => {
      // Reset the rules to their initial state (unchecked)
      const resetRules = rules.map((rule) => ({ ...rule, checked: false }));

      // Clear the localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("fs-rules");
      }

      return { rules: resetRules }; // Return the reset state
    });
  },
}));
