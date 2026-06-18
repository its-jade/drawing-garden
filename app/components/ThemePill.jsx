const PALETTE = [
  { bg: "#B8EACC", text: "#134D2A", border: "#9ED8B8" }, // sage green
  { bg: "#D2C6F2", text: "#3A268A", border: "#BDB0E0" }, // lavender
  { bg: "#B6D6EE", text: "#173C62", border: "#9DC4DC" }, // sky blue
  { bg: "#F2C8DC", text: "#6B1A42", border: "#E0B4CA" }, // rose
  { bg: "#B8DCDE", text: "#1A4A50", border: "#9ECACC" }, // teal
  { bg: "#DAC8F0", text: "#3C2668", border: "#C8B4E0" }, // lilac
  { bg: "#F2DCBC", text: "#6B3E1C", border: "#E0CAAA" }, // peach
  { bg: "#C4EACD", text: "#1A4830", border: "#ACDCBE" }, // mint
];

function colorIndex(index) {
  return ((index % PALETTE.length) + PALETTE.length) % PALETTE.length;
}

export default function ThemePill({
  theme,
  onRemove,
  animDelay = 0,
  className = "",
  paletteIndex = 0,
}) {
  const { bg, text, border } = PALETTE[colorIndex(paletteIndex)];

  return (
    <span
      className={[
        "pill-in relative inline-flex items-center px-3.5 py-[7px] rounded-full text-[13px] font-medium select-none",
        className,
      ].join(" ")}
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        animationDelay: `${animDelay}ms`,
      }}
    >
      {theme}

      {onRemove && (
        <button
          onClick={() => onRemove(theme)}
          aria-label={`Remove "${theme}"`}
          className="absolute right-2 opacity-0 transition-opacity duration-200 flex items-center group-hover:opacity-70 hover:!opacity-100"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="10" y2="10" />
            <line x1="10" y1="1" x2="1" y2="10" />
          </svg>
        </button>
      )}
    </span>
  );
}
