/* ── Inline SVGs avoid adding an icon-library dependency ── */

function SproutIcon() {
  return (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#1A3C2B"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M16.17 7.83 2 22m2.02-10a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12m3.83-4.17 8.34 8.34" />
    </svg>
  );
}

export default function Header({ activeTab, setActiveTab, themeCount }) {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-[14px] sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-1.5 select-none justify-self-start">
        <SproutIcon />
        <span className="font-semibold text-[#1A3C2B] tracking-[-0.02em] text-[15px]">
          DrawingGarden
        </span>
      </div>

      {/* Tab navigation */}
      <nav className="flex items-center gap-7 justify-self-center">
        {["prompt", "input"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "text-sm font-medium pb-0.5 transition-colors capitalize",
              activeTab === tab
                ? "text-[#1A3C2B] border-b-2 border-[#1A3C2B]"
                : "text-gray-400 hover:text-gray-600",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div aria-hidden="true" />
    </header>
  );
}
