import React from "react";

interface BrandLogoProps {
  /** "full" shows the wordmark, "mark" shows only the bridge icon */
  variant?: "full" | "mark";
  /** Render light text/icon for use on dark backgrounds */
  mono?: boolean;
  className?: string;
}

/**
 * NextBridge Limited brand lockup.
 * The bridge mark + wordmark accent use the `--brand` palette token,
 * so the logo re-skins automatically with the rest of the design system.
 *
 * - `mono` keeps the cyan accent but flips the wordmark to white,
 *   for use over dark / image hero backgrounds.
 */
const BrandLogo = ({
  variant = "full",
  mono = false,
  className = "",
}: BrandLogoProps) => {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Suspension-bridge mark */}
      <svg
        viewBox="0 0 96 96"
        className="h-9 w-9 shrink-0"
        fill="none"
        aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="92"
          height="92"
          rx="22"
          fill="var(--brand-ink)"
          stroke="var(--brand)"
          strokeWidth="2.5"
        />
        {/* deck */}
        <line
          x1="14"
          y1="64"
          x2="82"
          y2="64"
          stroke="var(--brand)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* main suspension cable */}
        <path
          d="M14 64 Q31 26 48 26 Q65 26 82 64"
          stroke="var(--brand)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* pylons */}
        <line
          x1="29"
          y1="34"
          x2="29"
          y2="64"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="67"
          y1="34"
          x2="67"
          y2="64"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* hanger cables */}
        <g stroke="var(--brand)" strokeWidth="2" strokeLinecap="round">
          <line x1="40" y1="29" x2="40" y2="64" />
          <line x1="48" y1="26" x2="48" y2="64" />
          <line x1="56" y1="29" x2="56" y2="64" />
        </g>
      </svg>

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif text-[19px] font-bold tracking-tight ${
              mono ? "text-white" : "text-dark"
            }`}>
            Next<span className="text-primary-100">Bridge</span>
          </span>
          <span
            className={`mt-1 text-[8px] font-semibold tracking-[0.38em] ${
              mono ? "text-white/60" : "text-ink-soft"
            }`}>
            LIMITED
          </span>
        </span>
      )}
    </span>
  );
};

export default BrandLogo;
