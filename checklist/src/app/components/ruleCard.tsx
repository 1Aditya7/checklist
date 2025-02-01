"use client";

import { useRulesStore } from "../store/useRulesStore";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

type RuleProps = {
  slNo: number;
  ruleIndex: string;
  name?: string;
  description: string;
  diagrams?: string;
  checked: boolean;
};

export default function RuleCard({
  slNo,
  ruleIndex,
  name,
  description: rawDescription, 
  diagrams,
  checked,
}: RuleProps) {
  const toggleRule = useRulesStore((state) => state.toggleRule);

  const processedDescription = rawDescription?.split("●").map((part, index) => (
    <p key={index}>
      {index === 0 ? part.trim() : `• ${part.trim()}`} 
    </p>
  ));

  return (
    <Card
      variant="dots"
      className={clsx(
        "p-4 relative border transition-colors duration-200",
        checked
          ? "border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-400"
          : "border-gray-300 dark:border-gray-700 bg-zinc-50 dark:zinc-800"
      )}
    >
      <CardContent className="flex items-center justify-between p-3 min-h-[64px] mr-4">
        <div className="space-y-0.5">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {ruleIndex} {name && <span>{name}</span>}
          </p>
          {processedDescription && ( 
            <div className="mr-8"> 
              {/* Add margin to create space between text and checkbox */}
              {processedDescription} 
            </div>
          )}
          {diagrams && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{diagrams}</p>
          )}
        </div>
        <div className="flex items-center self-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggleRule(slNo)}
            className="w-5 h-5 cursor-pointer accent-green-500"
          />
        </div>
      </CardContent>

    </Card>
  );
}