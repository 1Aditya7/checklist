"use client";

import { useRulesStore } from "../store/useRulesStore";

export default function ProgressBar() {
  const rules = useRulesStore((state) => state.rules);
  const checkedCount = rules.filter((rule) => rule.checked).length;
  const progress = rules.length > 0 ? (checkedCount / rules.length) * 100 : 0;

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-700">
          {checkedCount}/{rules.length} Rules Complying
        </p>


        <p className="text-sm font-medium text-gray-700">
          {Math.round(progress)}% Compliant
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden mt-2">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, #22c55e, #3b82f6 ${progress}%)`,
          }}
        />
      </div>
    </div>
  );
}
