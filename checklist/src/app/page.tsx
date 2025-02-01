"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRulesStore } from "./store/useRulesStore";
import RuleCard from "./components/ruleCard";
import ProgressBar from "./components/ProgressBar";
import ResetButton from "./components/ResetButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { GradualSpacing } from "@/components/ui/gradual-spacing"
import { HeroBanner } from "./components/HeroBanner";

export default function Home() {
  const rules = useRulesStore((state) => state.rules);
  const [isHydrated, setIsHydrated] = useState(false);

  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Show Banner
      </button>
    );
  }

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <main className="flex-col px-6 sm:px-4 md:px-0 max-w-[1024px] w-full mt-8 font-sans">
      {/* Header */}
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
        text="FS Rules Checklist"
      />
      {/* Hero Text */}
      <div className="mt-4 p-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-center mb-4">
          A straightforward checklist that considers every technical regulation of Formula Student Rulebooks. 
          Currently supports the Formula Bharat 2025 Rulebook, and upcoming updates will include 
          SAEINDIA, SAE International, and EV Rulebooks.
        </p>
        
        <HeroBanner
          buttonText="By Team Arion,"
          description="Free & Open Source. Always and Forever."
          onClick="https://www.instagram.com/_team.arion_/"
        />
      </div>
      

      <div className="flex justify-end items-center mt-8 mb-8">
        <ResetButton />
      </div>

      <div className="sticky top-10 z-[100] bg-zinc-100/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 px-6 shadow-md rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800">
        <div className="items-center justify-between">
          <h1 className="text-2xl font-bold">Formula Bharat 2025 Rules - CV</h1>
          {/* Progress Bar */}
          <ProgressBar />
        </div>
      </div>



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
      <ScrollToTopButton />
    </main>
  );
}
