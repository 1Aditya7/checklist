"use client";

import { useEffect, useState } from "react";
import { useRulesStore } from "./store/useRulesStore";
import RuleCard from "./components/ruleCard";
import ProgressBar from "./components/ProgressBar";
import ResetButton from "./components/ResetButton";

export default function Home() {
  const rules = useRulesStore((state) => state.rules);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <main className="flex-col px-6 sm:px-4 md:px-0 max-w-[1024px] w-full mt-8">
      {/* Header */}
      <h1 className="text-4xl text-black font-black tracking-tight text-center mt-12">Formula Student Rules Checklist</h1>
      <div className="flex justify-end items-center mt-8">
        <ResetButton />
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Rule Checklist */}
      <div className="mt-6 space-y-4">
        {rules.map((rule) => (
          <RuleCard
            key={rule.slNo}
            slNo={rule.slNo} // Used for state management, not displayed
            ruleIndex={rule.ruleIndex}
            name={rule.name}
            description={rule.rule}
            diagrams={rule.diagramOrSpecs}
            checked={rule.checked}
          />
        ))}
      </div>
    </main>
  );
}
