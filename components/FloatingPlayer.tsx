"use client";

import { useState, useRef, useEffect } from "react";

export default function FloatingPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const projectsVisible = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/musicplay_low.mp3");
    audio.preload = "metadata";
    audio.loop = false;
    audio.muted = localStorage.getItem("portfolio-sound-muted") !== "0";
    setMuted(audio.muted);
    audioRef.current = audio;

    const tick = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onPlay = () => {
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    };
    const onEnded = () => {
      if (projectsVisible.current && !audio.muted) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    const handleProjectsVisible = () => {
      projectsVisible.current = true;
      if (!audio.muted) {
        audio.play().catch(() => {});
      }
    };
    const handleProjectsHidden = () => {
      projectsVisible.current = false;
      audio.pause();
      audio.currentTime = 0;
    };
    const handleFrameSound = () => {
      if (projectsVisible.current) {
        audio.pause();
      }
    };
    const handleCertAudioStart = () => {
      audio.pause();
    };
    const handleSoundToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail as { muted: boolean };
      setMuted(detail.muted);
      audio.muted = detail.muted;
      if (detail.muted) {
        audio.pause();
      } else if (projectsVisible.current) {
        audio.play().catch(() => {});
      }
    };

    window.addEventListener("projects-visible", handleProjectsVisible);
    window.addEventListener("projects-hidden", handleProjectsHidden);
    window.addEventListener("frame-sound", handleFrameSound);
    window.addEventListener("cert-audio-start", handleCertAudioStart);
    window.addEventListener("sound-toggle", handleSoundToggle);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("projects-visible", handleProjectsVisible);
      window.removeEventListener("projects-hidden", handleProjectsHidden);
      window.removeEventListener("frame-sound", handleFrameSound);
      window.removeEventListener("cert-audio-start", handleCertAudioStart);
      window.removeEventListener("sound-toggle", handleSoundToggle);
      cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      setMuted(false);
      audio.play().catch(() => {});
      window.dispatchEvent(
        new CustomEvent("sound-toggle", { detail: { muted: false } }),
      );
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {expanded ? (
        <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all dark:bg-slate-800/90 dark:ring-white/10">
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
              Radiohead — Creep
            </p>
            <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Minimize"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 12H6" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all hover:scale-110 dark:bg-slate-800/90 dark:ring-white/10"
          aria-label="Expand player"
        >
          <svg className="h-4 w-4 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        </button>
      )}
    </div>
  );
}
