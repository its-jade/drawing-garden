"use client";

import { useState } from "react";
import ThemePill from "./ThemePill";

function SaveIcon() {
  return (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      viewBox="0 0 24 24"
    >
      <path d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5" />
      <path
        d="M8.5 21h7"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SproutSmall() {
  return (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#1A3C2B"
      viewBox="0 0 24 24"
    >
      <path d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5" />
    </svg>
  );
}

export default function InputView({ themes, onAddThemes, onRemoveTheme }) {
  const [value, setValue] = useState("");
  const [flash, setFlash] = useState(false); // brief "Saved!" feedback
  const [shaking, setShaking] = useState(false); // empty-submit shake

  const handleSave = () => {
    const parsed = value
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!parsed.length) {
      setShaking(true);
      setTimeout(() => setShaking(false), 450);
      return;
    }
    onAddThemes(parsed);
    setValue("");
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  };

  /* Cmd/Ctrl + Enter shortcut */
  const handleKey = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
  };

  return (
    <div className="max-w-xl mx-auto px-6 pt-14 pb-24">
      {/* Input card */}
      <div
        className={[
          "bg-white/55 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-sm",
          "border border-white/75 mb-10 transition-all",
          shaking ? "animate-[shake_0.4s_ease]" : "",
        ].join(" ")}
        style={shaking ? { "--tw-ring-color": "transparent" } : {}}
      >
        <label className="block text-[10px] font-bold text-garden-muted tracking-[0.12em] uppercase mb-3">
          Enter Ideas (One Per Line)
        </label>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={
            "Sunlight through leaves\nMelancholy clockwork\nSubmerged ruins..."
          }
          className={[
            "w-full h-36 bg-transparent resize-none outline-none",
            "text-garden-text placeholder-garden-faint/70 text-[14px] leading-[1.7]",
          ].join(" ")}
        />

        <div className="mt-3 pt-3 border-t border-black/[0.05]">
          <span className="text-[11px] text-garden-faint">
            {value.split("\n").filter(Boolean).length > 0 ? (
              `${value.split("\n").filter(Boolean).length} theme${value.split("\n").filter(Boolean).length > 1 ? "s" : ""} ready`
            ) : (
              <span className="opacity-0">–</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={handleSave}
          className={[
            "flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold",
            "transition-all active:scale-95",
            flash
              ? "bg-green-600 text-white"
              : "bg-[#1A3C2B] text-white hover:bg-[#2D5A3D]",
          ].join(" ")}
        >
          <SaveIcon />
          {flash ? "Saved ✓" : "Save to Garden"}
        </button>
      </div>

      {/* Garden of ideas */}
      {themes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SproutSmall />
              <h2 className="text-[17px] font-semibold text-[#1A3C2B]">
                Your Garden of Ideas
              </h2>
            </div>
            <span className="text-[11px] tracking-wide text-garden-muted uppercase">
              <span className="font-bold text-[#1A3C2B] text-[13px] normal-case not-italic">
                {themes.length}
              </span>{" "}
              seeds planted
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {themes.map((theme, i) => (
              <ThemePill
                key={theme}
                theme={theme}
                onRemove={onRemoveTheme}
                animDelay={i * 30}
                className="group transition-all duration-200 ease-out hover:pr-8"
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {themes.length === 0 && (
        <p className="text-center text-garden-faint text-[14px] pt-6">
          Your garden awaits its first seeds…
        </p>
      )}
    </div>
  );
}
