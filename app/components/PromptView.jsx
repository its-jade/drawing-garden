"use client";

import { useState } from "react";
import ThemePill from "./ThemePill";

/* ── Sparkles icon (matches the ✦ in the screenshot) ── */
function Sparkles({ size = 22 }) {
  return (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#FFFFFF"
        fill-rule="evenodd"
        d="M12.89 3.706c.336-1.093 1.883-1.093 2.22 0l1.553 5.049a1 1 0 0 0 .614.645l4.065 1.478c1.047.381 1.047 1.863 0 2.244L17.277 14.6a1 1 0 0 0-.614.645l-1.553 5.05c-.337 1.092-1.883 1.092-2.22 0l-1.553-5.05a1 1 0 0 0-.614-.645l-4.065-1.478c-1.047-.381-1.047-1.863 0-2.244L10.723 9.4a1 1 0 0 0 .614-.645zm-9.089-.272c.384-1.152 2.014-1.152 2.398 0a.58.58 0 0 0 .367.367c1.152.384 1.152 2.014 0 2.398a.58.58 0 0 0-.367.367c-.384 1.152-2.014 1.152-2.398 0a.58.58 0 0 0-.367-.367c-1.152-.384-1.152-2.014 0-2.398a.58.58 0 0 0 .367-.367m1 14c.384-1.152 2.014-1.152 2.398 0a.58.58 0 0 0 .367.367c1.152.384 1.152 2.014 0 2.398a.58.58 0 0 0-.367.367c-.384 1.152-2.014 1.152-2.398 0a.58.58 0 0 0-.367-.367c-1.152-.384-1.152-2.014 0-2.398a.58.58 0 0 0 .367-.367"
        clip-rule="evenodd"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4A8C5C"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-40"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default function PromptView({ themes, onGoToInput }) {
  const [seed, setSeed] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  const pickSeed = () => {
    if (!themes.length) return;
    setSpinning(true);
    setSeed(null);

    setTimeout(() => {
      const pick = themes[Math.floor(Math.random() * themes.length)];
      setSeed(pick);
      setRevealKey((k) => k + 1);
      setSpinning(false);
    }, 350);
  };

  const hasThemes = themes.length > 0;

  return (
    <div className="max-w-xl mx-auto px-6 pt-14 pb-24 flex flex-col items-center text-center">
      {/* CTA button */}
      <button
        onClick={hasThemes ? pickSeed : onGoToInput}
        disabled={spinning}
        className={[
          "relative flex items-center gap-3 px-10 py-4 rounded-full",
          "text-white text-[17px] font-semibold tracking-[-0.01em]",
          "shadow-[0_4px_20px_rgba(26,60,43,0.28)]",
          "transition-all duration-200 active:scale-95",
          spinning
            ? "opacity-80 cursor-wait bg-[#1A3C2B]"
            : hasThemes
              ? "bg-[#1A3C2B] hover:bg-[#2D5A3D] hover:shadow-[0_6px_28px_rgba(26,60,43,0.36)]"
              : "bg-[#4A8C5C] hover:bg-[#2D5A3D]",
        ].join(" ")}
      >
        {spinning ? (
          <>
            {/* Spinner */}
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Finding your seed…</span>
          </>
        ) : (
          <>
            <Sparkles size={20} />
            <span>
              {hasThemes
                ? seed
                  ? "Try another seed"
                  : "Get Seed"
                : "Add Themes"}
            </span>
          </>
        )}
      </button>

      {/* ── Revealed seed card ── */}
      {seed && !spinning && (
        <div key={revealKey} className="seed-reveal mt-12 w-full max-w-sm">
          <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-8 py-8 shadow-sm border border-white/80 flex flex-col items-center gap-4">
            <LeafIcon />

            <span className="text-[10px] font-bold text-garden-muted tracking-[0.14em] uppercase">
              Today's Seed
            </span>

            <ThemePill theme={seed} paletteIndex={themes.indexOf(seed)} />
          </div>
        </div>
      )}

      {/* ── Empty-garden hint ── */}
      {!hasThemes && (
        <p className="mt-10 text-garden-faint text-[13px]">
          No themes yet.{" "}
          <button
            onClick={onGoToInput}
            className="underline underline-offset-2 text-garden-muted hover:text-garden-dark transition-colors"
          >
            Go plant some seeds →
          </button>
        </p>
      )}
    </div>
  );
}
