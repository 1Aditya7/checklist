import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}

export function DotPattern({
  width = 24, // Increased spacing between dots
  height = 24, // Increased spacing between dots
  x = 0,
  y = 0,
  cx = 3, // Adjusted position of the dots
  cy = 3, // Adjusted position of the dots
  cr = 1.5, // Slightly larger dot size
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const maskId = `${id}-mask`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="white" />
          <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="black" stopOpacity="0.8" />
            <stop offset="20%" stopColor="black" stopOpacity="0.2" />
            <stop offset="80%" stopColor="black" stopOpacity="0.2" />
            <stop offset="100%" stopColor="black" stopOpacity="0.8" />
          </linearGradient>
          <rect width="100%" height="100%" fill="url(#fade-gradient)" />
        </mask>

        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
