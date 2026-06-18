"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputView from "./components/InputView";
import PromptView from "./components/PromptView";

const STORAGE_KEY = "drawing-garden-themes";

export default function Home() {
  const [activeTab, setActiveTab] = useState("prompt");
  const [themes, setThemes] = useState([]);
  const [mounted, setMounted] = useState(false);

  /* ── Hydrate from localStorage once mounted ── */
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setThemes(JSON.parse(raw));
    } catch {
      /* storage unavailable – silently continue */
    }
  }, []);

  /* ── Persist helpers ── */
  const persist = (next) => {
    setThemes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  };

  const addThemes = (incoming) => {
    const deduped = [
      ...new Set([...themes, ...incoming.filter((t) => t.trim())]),
    ];
    persist(deduped);
  };

  const removeTheme = (theme) => persist(themes.filter((t) => t !== theme));

  /* ── Avoid hydration mismatch ── */
  if (!mounted) return null;

  return (
    <main className="garden-bg min-h-screen">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        themeCount={themes.length}
      />

      {activeTab === "prompt" ? (
        <PromptView themes={themes} onGoToInput={() => setActiveTab("input")} />
      ) : (
        <InputView
          themes={themes}
          onAddThemes={addThemes}
          onRemoveTheme={removeTheme}
        />
      )}
    </main>
  );
}
