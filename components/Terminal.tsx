"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  type Difficulty,
  type GameResult,
  getRandomSnippet,
  calculateAccuracy,
  getResult,
  getTimeLimit,
} from "@/lib/typing-game";

const COMMANDS: Record<string, string[]> = {
  welcome: [
    "Muhammad Ihya 'Ulumuddin",
    "Backend & Full Stack Software Engineer",
    "",
    "Focused on building reliable, scalable systems",
    "with Go, PostgreSQL, Node.js, and Docker.",
  ],
  skills: [
    "Backend    → Go, Node.js, Express.js, Gin, Laravel",
    "Database   → PostgreSQL, MySQL, Redis, BigQuery",
    "Frontend   → React, Next.js, TypeScript",
    "Infra      → Docker, AWS S3, Azure",
    "AI/ML      → Python, scikit-learn, Deep Learning",
    "Data       → Pandas, Data Visualization, Geospatial",
    "Forecasting→ Time Series, Hybrid Models",
    "Ethics     → SHAP, PDP, Bias Mitigation",
  ],
  backend: ["Go", "Node.js", "Express.js", "Gin", "Laravel"],
  db: ["PostgreSQL", "MySQL", "Redis", "Advanced SQL", "BigQuery"],
  frontend: ["React", "Next.js", "TypeScript", "Web Applications"],
  infra: ["Docker", "AWS S3", "Azure Functions", "CI/CD"],
  ai: ["Python", "scikit-learn", "Deep Learning", "Feature Engineering"],
  projects: [
    "1. UangKu — Family Finance (Go, PostgreSQL, React)",
    "2. PPOB Payment Platform (Node.js, Express, Redis)",
    "3. FoodDash — Food Delivery (Laravel, MySQL, Midtrans)",
    "4. Mango Freshness AI (Python, scikit-learn, OpenCV)",
  ],
  experience: [
    "Programmer Intern — PT Aplikasi Dagang Teknologi",
    "Jan 2026 – Jun 2026",
    "• PPOB payment platform features",
    "• 5-level affiliate commission (recursive CTE)",
    "• API optimization (Redis cache + PostgreSQL)",
    "• Cross-functional React + Go team",
  ],
  education: [
    "Politeknik Negeri Indramayu — S1 Rekayasa Perangkat Lunak (2023–2027)",
    "SMK PONPES CadangPinggan (2019–2022)",
    "SMPN 3 Jatibarang (2016–2019)",
    "SDN Jatisawit Lor 3 (2010–2016)",
  ],
  contact: [
    "Email    → muhammadihya11289@gmail.com",
    "GitHub   → github.com/yaaeww",
    "LinkedIn → linkedin.com/in/muhammad-ihya-ulumuddin/",
  ],
  help: [
    "Available commands:",
    "  welcome              — Who I am",
    "  skills               — All technical skills",
    "  backend/db/frontend/infra/ai — Skill categories",
    "  projects             — Featured projects",
    "  experience           — Work experience",
    "  education            — Education history",
    "  contact              — How to reach me",
    "  run                  — Typing speed race",
    "  clear                — Clear terminal",
    "  help                 — Show this help",
  ],
};

const WELCOME_LINES = [
  "$ welcome",
  "Muhammad Ihya 'Ulumuddin",
  "Backend & Full Stack Software Engineer",
  "",
  "Type 'help' to see available commands.",
  "Type 'run' to play a typing speed game.",
  "",
];

const DIFFICULTY_PROMPT = [
  "  Choose difficulty:",
  "    easy    → single keywords    (30s)",
  "    medium  → 1-2 line snippets  (60s)",
  "    hard    → multi-line blocks   (90s)",
  "",
];

type GamePhase = "idle" | "selecting" | "countdown" | "playing" | "results";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(true);
  const [welcomed, setWelcomed] = useState(false);
  const [active, setActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Game state
  const [gamePhase, setGamePhase] = useState<GamePhase>("idle");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [targetText, setTargetText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState<GameResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const gameInputRef = useRef<HTMLInputElement>(null);
  const targetTextRef = useRef("");
  const typedTextRef = useRef("");

  const scrollToBottom = useCallback(() => {
    const area = scrollAreaRef.current;
    if (area) {
      area.scrollTop = area.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (welcomed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !welcomed) {
          setWelcomed(true);
          let i = 0;
          const interval = setInterval(() => {
            if (i < WELCOME_LINES.length) {
              setLines((prev) => [...prev, WELCOME_LINES[i]]);
              i++;
            } else {
              clearInterval(interval);
              setTyping(false);
            }
          }, 200);
        }
      },
      { threshold: 0.3 },
    );

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [welcomed]);

  useEffect(() => {
    if (gamePhase === "playing" || gamePhase === "countdown") return;
    scrollToBottom();
  }, [lines, scrollToBottom, gamePhase]);

  // Timer for game
  useEffect(() => {
    if (gamePhase === "playing" && difficulty) {
      const limit = getTimeLimit(difficulty);
      startTimeRef.current = Date.now();
      setElapsed(0);
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const secs = Math.floor((now - startTimeRef.current) / 1000);
        setElapsed(secs);
        if (secs >= limit) {
          finishGame();
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gamePhase, difficulty]);

  const finishGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const secs = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const r = getResult(targetTextRef.current, typedTextRef.current, secs);
    setResult(r);
    setGamePhase("results");
  }, []);

  const startGame = useCallback((diff: Difficulty) => {
    const snippet = getRandomSnippet(diff);
    setDifficulty(diff);
    setTargetText(snippet);
    targetTextRef.current = snippet;
    setTypedText("");
    typedTextRef.current = "";
    setResult(null);
    setElapsed(0);
    setCountdown(3);
    setInput("");
    setGamePhase("countdown");
  }, []);

  // Countdown effect
  useEffect(() => {
    if (gamePhase !== "countdown") return;
    if (countdown <= 0) {
      setGamePhase("playing");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 800);
    return () => clearTimeout(t);
  }, [gamePhase, countdown]);

  // Focus game input when playing
  useEffect(() => {
    if (gamePhase === "playing") {
      setTimeout(() => gameInputRef.current?.focus(), 50);
    }
  }, [gamePhase]);

  const handleContainerClick = () => {
    setActive(true);
    if (gamePhase === "playing") {
      gameInputRef.current?.focus();
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const showDifficultyPrompt = () => {
    setLines((prev) => [
      ...prev,
      "",
      "  ⌨  TYPING SPEED RACE",
      "  ─────────────────────",
      "",
      "  Code-themed typing test. Type the snippet as fast",
      "  as you can. Your stats are tracked in real-time.",
      "",
      ...DIFFICULTY_PROMPT,
    ]);
    setGamePhase("selecting");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "run") {
      setLines((prev) => [...prev, "$ run"]);
      showDifficultyPrompt();
      return;
    }

    if (gamePhase === "selecting") {
      const valid: Difficulty[] = ["easy", "medium", "hard"];
      if (valid.includes(cmd as Difficulty)) {
        setLines((prev) => [...prev, `$ ${cmd}`]);
        startGame(cmd as Difficulty);
        return;
      }
      if (cmd === "exit" || cmd === "quit") {
        setLines((prev) => [
          ...prev,
          `$ ${cmd}`,
          "  Game cancelled.",
          "",
        ]);
        setGamePhase("idle");
        return;
      }
      setLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        `  Invalid. Type 'easy', 'medium', or 'hard'.`,
        "",
      ]);
      return;
    }

    if (gamePhase === "results") {
      const valid: Difficulty[] = ["easy", "medium", "hard"];
      if (valid.includes(cmd as Difficulty)) {
        setLines((prev) => [...prev, `$ ${cmd}`]);
        startGame(cmd as Difficulty);
        return;
      }
      if (cmd === "exit" || cmd === "quit") {
        setLines((prev) => [
          ...prev,
          `$ ${cmd}`,
          "  Back to terminal.",
          "",
        ]);
        setGamePhase("idle");
        return;
      }
      setLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        `  Type a difficulty (easy/medium/hard) or 'exit' to quit.`,
        "",
      ]);
      return;
    }

    const output = COMMANDS[cmd];
    if (output) {
      setLines((prev) => [...prev, `$ ${cmd}`, ...output, ""]);
    } else {
      setLines((prev) => [
        ...prev,
        `$ ${cmd}`,
        `bash: ${cmd}: command not found. Type 'help' for available commands.`,
        "",
      ]);
    }
  };

  const timeLimit = difficulty ? getTimeLimit(difficulty) : 30;
  const timeLeft = Math.max(0, timeLimit - elapsed);

  const renderTypedArea = () => {
    if (gamePhase !== "playing" && gamePhase !== "countdown") return null;
    if (!difficulty) return null;

    return (
      <div className="mt-2 space-y-2">
        {gamePhase === "countdown" && (
          <div className="flex items-center justify-center py-4">
            <span className="text-4xl font-bold text-green-400 animate-pulse">
              {countdown > 0 ? countdown : "GO!"}
            </span>
          </div>
        )}

        {gamePhase === "playing" && (
          <>
            <div className="rounded-lg border border-white/10 bg-slate-950/50 p-2.5 max-h-[200px] overflow-y-auto">
              <div className="font-mono text-xs leading-tight whitespace-pre-wrap break-all">
                {targetText.split("").map((char, i) => {
                  let color = "text-slate-500";
                  if (i < typedText.length) {
                    color =
                      typedText[i] === char
                        ? "text-green-400"
                        : "text-red-400 bg-red-400/10";
                  }
                  if (char === "\t") {
                    return (
                      <span key={i} className={`${color} transition-colors duration-75`}>
                        {"→"}
                      </span>
                    );
                  }
                  if (char === "\n") {
                    return (
                      <span key={i} className={`${color} transition-colors duration-75`}>
                        {"↵\n"}
                      </span>
                    );
                  }
                  return (
                    <span key={i} className={`${color} transition-colors duration-75`}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span>
                Time{" "}
                <span className={timeLeft <= 5 ? "text-red-400 font-bold" : "text-green-400"}>
                  {timeLeft}s
                </span>
              </span>
              <span>
                WPM{" "}
                <span className="text-green-400">
                  {elapsed > 0
                    ? Math.round((typedText.length / 5) / (elapsed / 60))
                    : 0}
                </span>
              </span>
              <span>
                Acc{" "}
                <span className="text-green-400">
                  {typedText.length > 0
                    ? calculateAccuracy(targetText, typedText)
                    : 100}
                  %
                </span>
              </span>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-0"
            >
              <span className="text-green-400 font-semibold">$&nbsp;</span>
              <input
                ref={gameInputRef}
                type="text"
                value=""
                onChange={() => {}}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setGamePhase("idle");
                    setLines((prev) => [...prev, "  Game cancelled.", ""]);
                    setInput("");
                    return;
                  }
                  if (e.key === "Backspace") {
                    e.preventDefault();
                    const current = typedTextRef.current;
                    if (current.length > 0) {
                      const next = current.slice(0, -1);
                      typedTextRef.current = next;
                      setTypedText(next);
                    }
                    return;
                  }
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const target = targetTextRef.current;
                    const typed = typedTextRef.current;
                    if (typed.length < target.length && target[typed.length] === "\t") {
                      const next = typed + "\t";
                      typedTextRef.current = next;
                      setTypedText(next);
                      if (next.length === target.length) finishGame();
                    }
                    return;
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const target = targetTextRef.current;
                    const typed = typedTextRef.current;
                    if (typed.length < target.length && target[typed.length] === "\n") {
                      const next = typed + "\n";
                      typedTextRef.current = next;
                      setTypedText(next);
                      if (next.length === target.length) finishGame();
                    }
                    return;
                  }
                  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    const target = targetTextRef.current;
                    const typed = typedTextRef.current;
                    if (typed.length < target.length) {
                      const next = typed + e.key;
                      typedTextRef.current = next;
                      setTypedText(next);
                      if (next.length === target.length) finishGame();
                    }
                  }
                }}
                className="flex-1 bg-transparent font-mono text-xs text-slate-200 outline-none"
                placeholder="type here... (Tab=→ Enter=↵)"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </>
        )}
      </div>
    );
  };

  const renderResults = () => {
    if (gamePhase !== "results" || !result) return null;

    const completionRatio = result.totalChars > 0
      ? result.correctChars / result.totalChars
      : 0;
    const score = (result.wpm * 0.4) + (result.accuracy * 0.3) + (completionRatio * 100 * 0.3);
    const grade =
      score >= 85
        ? { label: "S", color: "text-yellow-400" }
        : score >= 70
          ? { label: "A", color: "text-green-400" }
          : score >= 50
            ? { label: "B", color: "text-blue-400" }
            : score >= 30
              ? { label: "C", color: "text-slate-300" }
              : { label: "D", color: "text-red-400" };

    return (
      <div className="mt-2 space-y-2">
        <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4 font-mono text-sm">
          <div className="mb-3 text-center text-slate-400">
            ═══════ RESULTS ═══════
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">WPM</span>
              <span className="text-green-400 font-bold">{result.wpm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Accuracy</span>
              <span className="text-green-400">{result.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time</span>
              <span className="text-green-400">{result.time}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Correct</span>
              <span className="text-green-400">
                {result.correctChars}/{result.totalChars} chars
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
              <span className="text-slate-400">Grade</span>
              <span className={`${grade.color} font-bold text-lg`}>{grade.label}</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          {score >= 85 && "Incredible! You type like a machine."}
          {score >= 70 && score < 85 && "Great job! Above average developer speed."}
          {score >= 50 && score < 70 && "Solid! Most developers type around this speed."}
          {score < 50 && "Keep practicing! Speed comes with time."}
        </div>
      </div>
    );
  };

  const isSelectingOrResults = gamePhase === "selecting" || gamePhase === "results";
  const placeholder =
    gamePhase === "results"
      ? "difficulty or 'exit'..."
      : gamePhase === "selecting"
        ? "easy | medium | hard"
        : "type a command...";

  return (
    <section className="bg-slate-50 px-4 py-14 sm:py-16 dark:bg-slate-950" id="terminal">
      <div className="mx-auto max-w-3xl">
        <div
          ref={containerRef}
          tabIndex={-1}
          onClick={handleContainerClick}
          className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-slate-900/50 dark:ring-white/10 outline-none"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-slate-500">terminal</span>
          </div>

          <div ref={scrollAreaRef} className="max-h-[400px] overflow-y-auto p-4 font-mono text-sm leading-relaxed">
            {lines.map((line, i) => (
              <div
                key={`${i}-${line}`}
                className={
                  !line
                    ? "h-3"
                    : line.startsWith("$")
                      ? "text-green-400 font-semibold"
                      : "text-slate-300"
                }
              >
                {line}
              </div>
            ))}

            {renderTypedArea()}
            {renderResults()}

            {!typing && active && isSelectingOrResults && (
              <form onSubmit={handleSubmit} className="flex items-center gap-0 mt-2">
                <span className="text-green-400 font-semibold">$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none"
                  placeholder={placeholder}
                  autoFocus
                />
              </form>
            )}

            {!typing && active && gamePhase === "idle" && (
              <form onSubmit={handleSubmit} className="flex items-center gap-0">
                <span className="text-green-400 font-semibold">$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none"
                  placeholder="type a command..."
                  autoFocus
                />
              </form>
            )}

            {!typing && !active && gamePhase === "idle" && (
              <div className="mt-2 flex items-center gap-2 text-slate-500">
                <span className="text-green-400 font-semibold">$</span>
                <span className="cursor-pointer text-sm italic hover:text-slate-300 transition-colors">
                  Click here to start typing...
                </span>
                <span className="terminal-cursor" />
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
