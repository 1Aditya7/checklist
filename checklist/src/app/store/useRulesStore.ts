"use client";

import { create } from "zustand";
import { rules } from "../data/rules";

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
}));
