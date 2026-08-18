"use client";

import { useState, useEffect } from "react";
import { toggleMute, isMuted } from "@/lib/sound";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(isMuted());
  }, []);

  useEffect(() => {
    const handleSoundToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as { muted: boolean };
      setMuted(detail.muted);
    };
    window.addEventListener("sound-toggle", handleSoundToggle);
    return () => window.removeEventListener("sound-toggle", handleSoundToggle);
  }, []);

  const handleToggle = () => {
    const nowMuted = toggleMute();
    setMuted(nowMuted);
    window.dispatchEvent(
      new CustomEvent("sound-toggle", { detail: { muted: nowMuted } }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg dark:bg-slate-800/80 dark:ring-white/10 dark:hover:bg-slate-700"
      title={muted ? "Unmute suara" : "Mute suara"}
    >
      {muted ? (
        <svg
          className="h-4 w-4 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          className="h-4 w-4 text-slate-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
