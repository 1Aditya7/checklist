"use client";

import { useEffect, useState } from "react";
import { useRulesStore } from "./store/useRulesStore";
import RuleCard from "../app/components/ruleCard";
import ProgressBar from "../app/components/ProgressBar";
import ResetButton from "../app/components/ResetButton";

export default function Home() {
  const rules = useRulesStore((state) => state.rules);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent rendering until hydration completes
  if (!isHydrated) return null;

  return (
    <main className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full mt-12">
      <div className="flex justify-center">
        <h1 className="text-4xl text-black font-black tracking-tight text-center">
          The Only Formula Student <br /> Checklist You Need
        </h1>
      </div>
      <div className="flex flex-col mt-12 text-black font-bold tracking-tight text-2xl justify-start">Formula Bharat 2025 Rules</div>
      <div className="text-gray-500">For Combustion Vehicles {"(CV)"}</div>
      <ProgressBar />
      <div className="mt-4 flex justify-end">
      <ResetButton />
      </div>
      {/* Render all rules as cards */}
      <div className="mt-6 space-y-4">
        {rules.map((rule, index) => (
          <RuleCard
            key={rule.slNo || `fallback-${index}`} // Ensure unique key for cards
            slNo={rule.slNo} // Passed for state management
            ruleIndex={rule.ruleIndex}
            name={rule.name}
            description={rule.rule}
            diagrams={rule.diagramOrSpecs}
            checked={rule.checked}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <ResetButton />
      </div>
    </main>
  );
}
