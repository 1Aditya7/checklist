"use client";

import { useEffect, useState } from "react";
import { useRulesStore } from "./store/useRulesStore";
import RuleCard from "../app/components/ruleCard";
import ProgressBar from "../app/components/ProgressBar";
import ResetButton from "../app/components/resetButton"; // Import ResetButton

export default function Home() {
  const rules = useRulesStore((state) => state.rules);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration before rendering rules to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent rendering until hydration completes
  if (!isHydrated) return null;

  return (
    <main className="flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full bg-gray-100 mt-12">
      <div className="flex justify-center">
        <h1 className="text-4xl text-black font-black tracking-tight text-center">
          The Only Formula Student <br /> Checklist You Need
        </h1>
      </div>
      <ProgressBar />
      {/* Rule Checklist */}
      <div className="mt-6 space-y-4">
        {rules.map((rule) => (
          <RuleCard key={rule.id} {...rule} />
        ))}
      </div>

      {/* Reset Button */}
      <div className="mt-8 text-center">
        <ResetButton /> {/* Add ResetButton here */}
      </div>
    </main>
  );
}
