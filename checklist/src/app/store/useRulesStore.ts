"use client";

import { create } from "zustand";
import { rules as rawRules } from "../data/rules";

// Define Rule Type
type Rule = {
  slNo: number; // Unique identifier
  ruleIndex: string;
  name?: string;
  rule: string; // Rule description
  diagramOrSpecs?: string;
  checked: boolean;
};

type RulesState = {
  rules: Rule[];
  toggleRule: (slNo: number) => void;
  resetRules: () => void;
  addUniqueSlNo: () => void;
};

// Ensure unique `slNo` using a Set
const formatRules = (rawRules: any[]): Rule[] => {
  const seenSlNos = new Set<number>();

  return rawRules.map((rule, index) => {
    const slNo = rule.slNo ? Number(rule.slNo) : index + 1; // Generate fallback `slNo`
    seenSlNos.add(slNo); // Add to Set to ensure uniqueness

    return {
      slNo,
      ruleIndex: rule.ruleIndex,
      name: rule.name || "",
      rule: rule.rule || "",
      diagramOrSpecs: rule.diagramOrSpecs || "",
      checked: rule.checked ?? false, // Default checked state
    };
  });
};

const getSavedRules = (): Rule[] => {
  if (typeof window !== "undefined") {
    const storedRules = localStorage.getItem("fs-rules");
    return storedRules ? JSON.parse(storedRules) : formatRules(rawRules);
  }
  return formatRules(rawRules);
};

export const useRulesStore = create<RulesState>((set) => ({
  rules: getSavedRules(),

  toggleRule: (slNo: number) => {
    set((state) => {
      const updatedRules = state.rules.map((rule) =>
        rule.slNo === slNo ? { ...rule, checked: !rule.checked } : rule
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("fs-rules", JSON.stringify(updatedRules));
      }

      return { rules: updatedRules };
    });
  },

  resetRules: () => {
    set(() => {
      const resetRules = formatRules(rawRules).map((rule) => ({ ...rule, checked: false }));

      if (typeof window !== "undefined") {
        localStorage.removeItem("fs-rules");
      }

      return { rules: resetRules };
    });
  },

  addUniqueSlNo: () => {
    set((state) => {
      const seenSlNos = new Set<number>();
      const updatedRules = state.rules.map((rule, index) => {
        if (seenSlNos.has(rule.slNo)) {
          rule.slNo = Math.max(...Array.from(seenSlNos)) + 1; // Generate a unique `slNo` if duplicated
        }
        seenSlNos.add(rule.slNo);
        return rule;
      });

      return { rules: updatedRules };
    });
  },
}));
