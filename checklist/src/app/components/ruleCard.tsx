"use client";

import { useRulesStore } from "../store/useRulesStore";
import { Card, CardContent } from "@/components/ui/card"
import clsx from "clsx";

// Define RuleCard component's props
type RuleProps = {
  slNo: number;
  ruleIndex: string;
  name?: string; // Allow name to be undefined
  description: string;
  diagrams: string | undefined; // Keep diagrams as string | undefined
  checked: boolean;
};

const cardContent = {
  title: "Lorem ipsum dolor",
  description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!"
}

export default function RuleCard({
  slNo,
  ruleIndex,
  name,
  description,
  diagrams,
  checked,
}: RuleProps) {
  const toggleRule = useRulesStore((state) => state.toggleRule);

  return (

    <div
      className={clsx(
        "p-4 border rounded-lg shadow-md flex justify-between items-center",
        checked ? "bg-green-100 border-green-500" : "bg-white border-gray-300"
      )}
    >
      <div>
        <p className="font-semibold text-black">{ruleIndex} {name || ""}</p> {/* Use fallback if name is undefined */}
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400">{diagrams}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleRule(slNo)} // Toggle rule on checkbox click
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  );
}
