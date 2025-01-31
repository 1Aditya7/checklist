"use client";

import { useRulesStore } from "../store/useRulesStore";
import clsx from "clsx";

type RuleProps = {
  id: string;
  rule: string;
  interpretation: string;
  checked: boolean;
};

export default function RuleCard({ id, rule, interpretation, checked }: RuleProps) {
  const toggleRule = useRulesStore((state) => state.toggleRule);

  return (
    <div
      className={clsx(
        "p-4 border rounded-lg shadow-md flex justify-between items-center",
        checked ? "bg-green-100 border-green-500" : "bg-white border-gray-300"
      )}
    >
      <div>
        <p className="font-semibold">{rule}</p>
        <p className="text-sm text-gray-500 italic">{interpretation}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleRule(id)}
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  );
}
