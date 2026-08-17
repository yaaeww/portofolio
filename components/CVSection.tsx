"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import type { ComponentType } from "react";
import { cvData } from "@/data/cv";
import { isMuted } from "@/lib/sound";
import CertificateCarousel from "@/components/CertificateCarousel";
import {
  LinkedInIcon,
  InstagramIcon,
  CpuIcon,
  LayersIcon,
  TrendingUpIcon,
  ShieldIcon,
  DatabaseIcon,
  ServerIcon,
  LayoutIcon,
  CloudIcon,
} from "@/components/icons";
import type { FeaturedSkill, Project } from "@/data/cv";

function NowPlaying() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const projectsVisible = useRef(false);

  useEffect(() => {
    const audio = new Audio(
      "/audio/musicplay.mp3",
    );
    audio.preload = "metadata";
    audio.loop = false;
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
      setProgress(0);
      cancelAnimationFrame(rafRef.current);
      if (projectsVisible.current && !isMuted()) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        setPlaying(false);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    const handleProjectsVisible = () => {
      projectsVisible.current = true;
      if (!isMuted() && audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };
    const handleProjectsHidden = () => {
      projectsVisible.current = false;
    };
    const handleFrameSound = () => {
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
      setProgress(0);
    };
    const handleCertStart = () => {
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
      setProgress(0);
    };
    const handleMuteToggle = () => {
      if (isMuted()) {
        audio.pause();
      } else if (projectsVisible.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    window.addEventListener("projects-visible", handleProjectsVisible);
    window.addEventListener("projects-hidden", handleProjectsHidden);
    window.addEventListener("frame-sound", handleFrameSound);
    window.addEventListener("cert-audio-start", handleCertStart);
    window.addEventListener("sound-toggle", handleMuteToggle);

    return () => {
      cancelAnimationFrame(rafRef.current);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      window.removeEventListener("projects-visible", handleProjectsVisible);
      window.removeEventListener("projects-hidden", handleProjectsHidden);
      window.removeEventListener("frame-sound", handleFrameSound);
      window.removeEventListener("cert-audio-start", handleCertStart);
      window.removeEventListener("sound-toggle", handleMuteToggle);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [playing]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div
            className={`h-16 w-16 overflow-hidden rounded-full ring-2 ring-slate-200 ${playing ? "animate-[spin_3s_linear_infinite]" : ""}`}
          >
            <Image
              src="/assets/lagu.jpg"
              alt="Radiohead - Creep"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-transform hover:scale-110"
          >
            {playing ? (
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="ml-0.5 h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">Creep</p>
          <p className="truncate text-xs text-slate-500">Radiohead</p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-xl font-black tracking-tight text-slate-900 select-none">
        are u ok ??
      </p>
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const textContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const skillIcons: Record<
  FeaturedSkill["icon"],
  ComponentType<{ className?: string }>
> = {
  brain: CpuIcon,
  layers: LayersIcon,
  trend: TrendingUpIcon,
  shield: ShieldIcon,
  database: DatabaseIcon,
  server: ServerIcon,
  layout: LayoutIcon,
  cloud: CloudIcon,
};

const skillGradients: Record<FeaturedSkill["icon"], string> = {
  brain: "from-indigo-500 to-violet-600",
  layers: "from-sky-500 to-cyan-500",
  trend: "from-amber-500 to-orange-600",
  shield: "from-rose-500 to-pink-600",
  database: "from-teal-500 to-emerald-600",
  server: "from-slate-600 to-slate-800",
  layout: "from-fuchsia-500 to-purple-600",
  cloud: "from-blue-500 to-indigo-600",
};

function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-video w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 ${className ?? ""}`}
    >
      <svg
        className="h-8 w-8 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      <span className="text-xs font-medium text-slate-400">{label}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const fullText = [
    project.description,
    ...(project.contributions ?? []).map((contribution) =>
      [contribution.title, contribution.detail, ...(contribution.points ?? [])].join(
        " ",
      ),
    ),
  ].join(" ");
  const tooLong = fullText.length > 300;

  return (
    <motion.div
      variants={item}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      {project.image ? (
        <div className="relative aspect-video w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder label="Project image coming soon" />
      )}
      <div className="p-6 sm:p-7">
        <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>

        {!expanded && tooLong ? (
          <p className="mt-2 leading-relaxed text-slate-600">
            {fullText.slice(0, 300)}…
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="ml-1 inline text-xs font-semibold text-indigo-600 hover:underline"
            >
              Lihat Selengkapnya
            </button>
          </p>
        ) : (
          <div className="space-y-4">
            <p className="mt-2 leading-relaxed text-slate-600">
              {project.description}
            </p>
            {project.contributions ? (
              <ol className="space-y-3">
                {project.contributions.map((contribution, idx) => (
                  <li key={contribution.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {contribution.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {contribution.detail}
                      </p>
                      {contribution.points ? (
                        <ul className="mt-2 space-y-1.5">
                          {contribution.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2 text-sm leading-relaxed text-slate-600"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
            {tooLong ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
              >
                Tutup
                <span aria-hidden>▴</span>
              </button>
            ) : null}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CVSection() {
  const certHeadingRef = useRef<HTMLDivElement>(null);
  const certAudioRef = useRef<HTMLAudioElement | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          window.dispatchEvent(
            new CustomEvent(entry.isIntersecting ? "projects-visible" : "projects-hidden"),
          );
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = certHeadingRef.current;
    if (!el) return;

    const audio = new Audio(
      "/audio/Queen - We Are The Champions (Official Video Remastered).mp3",
    );
    audio.preload = "auto";
    audio.loop = false;
    audio.currentTime = 30;
    certAudioRef.current = audio;

    let hasEnded = false;

    const handleEnded = () => {
      hasEnded = true;
    };
    audio.addEventListener("ended", handleEnded);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hasEnded) {
              hasEnded = false;
              audio.currentTime = 30;
            }
            if (!isMuted()) {
              audio.currentTime = 30;
              audio.play().catch(() => {});
              window.dispatchEvent(new CustomEvent("cert-audio-start"));
            }
          } else {
            audio.pause();
            audio.currentTime = 30;
            hasEnded = false;
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      certAudioRef.current = null;
    };
  }, []);

  const handleMuteChange = useCallback((e: Event) => {
    const audio = certAudioRef.current;
    if (!audio) return;
    const detail = (e as CustomEvent<{ muted: boolean }>).detail;
    if (detail.muted) {
      audio.pause();
    } else {
      audio.currentTime = 30;
      audio.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    window.addEventListener("sound-toggle", handleMuteChange);
    return () => window.removeEventListener("sound-toggle", handleMuteChange);
  }, [handleMuteChange]);

  return (
    <section id="cv" className="scroll-mt-8 bg-dot-pattern bg-slate-50 px-4 py-20 sm:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <motion.h3 variants={textItem} className="text-lg font-bold text-slate-900">
                About
              </motion.h3>
              <motion.p
                variants={textItem}
                className="mt-3 leading-relaxed text-slate-600"
              >
                {cvData.summary}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7"
          >
            <NowPlaying />
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 md:col-span-2"
          >
            <motion.div variants={textContainer}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.h3
                  variants={textItem}
                  className="text-lg font-bold text-slate-900"
                >
                  Featured Skills
                </motion.h3>
                <motion.a
                  variants={textItem}
                  href={cvData.linkedinSkills}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#084d96]"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  View All on LinkedIn
                </motion.a>
              </div>
              <motion.div
                variants={textItem}
                className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {cvData.featuredSkills.map((skill) => {
                  const Icon = skillIcons[skill.icon];
                  return (
                    <motion.div
                      key={skill.title}
                      variants={textItem}
                      className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-indigo-100"
                    >
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${skillGradients[skill.icon]} text-white shadow-sm transition-transform group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="mt-3 text-sm font-bold text-slate-900">
                        {skill.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {skill.subtitle}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {skill.skills.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-black/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 md:col-span-2"
          >
            <motion.div variants={textContainer}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.h3 variants={textItem} className="text-lg font-bold text-slate-900">
                  Experience
                </motion.h3>
                <motion.a
                  variants={textItem}
                  href="https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/experience/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#084d96]"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  View All on LinkedIn
                </motion.a>
              </div>
              <motion.div
                variants={textItem}
                className="mt-4 flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {cvData.experience.role}
                  </p>
                  <p className="text-sm text-slate-500">
                    {cvData.experience.company}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {cvData.experience.duration}
                </span>
              </motion.div>
              <ul className="mt-4 space-y-2 text-slate-600">
                {cvData.experience.points.map((point) => (
                  <motion.li
                    key={point}
                    variants={textItem}
                    className="flex gap-2.5"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 md:col-span-2"
          >
            <motion.div variants={textContainer}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.h3
                  variants={textItem}
                  className="text-lg font-bold text-slate-900"
                >
                  Organizations &amp; Leadership
                </motion.h3>
                <motion.a
                  variants={textItem}
                  href="https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/education/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#084d96]"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  View All on LinkedIn
                </motion.a>
              </div>
              <motion.div variants={textItem} className="mt-4 space-y-5">
                {cvData.organizations.map((org) => (
                  <div
                    key={`${org.role}-${org.organization}`}
                    className="rounded-xl bg-slate-50 p-4 ring-1 ring-black/5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800">{org.role}</p>
                        <p className="text-sm text-slate-500">
                          {org.organization}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {org.duration}
                      </span>
                    </div>
                    {org.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {org.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div ref={projectsRef}>
          <motion.div
            variants={item}
            className="mb-6 mt-14 flex items-end justify-between gap-4 sm:mt-16"
          >
            <motion.h3
              variants={textItem}
              className="text-xl font-bold text-slate-900 sm:text-2xl"
            >
              Projects
            </motion.h3>
            <motion.a
              variants={textItem}
              href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTYzNDkxNzc4NDA2MzI5?igsh=MTFpbXh5c2ZtM3hkdQ=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Project di Instagram</span>
              <span className="sm:hidden">Instagram</span>
            </motion.a>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {cvData.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div ref={certHeadingRef}>
          <motion.div
            variants={item}
            className="mb-6 mt-14 flex items-end justify-between gap-4 sm:mt-16"
          >
            <motion.h3
              variants={textItem}
              className="text-xl font-bold text-slate-900 sm:text-2xl"
            >
              Certificates
            </motion.h3>
            <motion.p
              variants={textItem}
              className="hidden text-sm text-slate-500 sm:block"
            >
              Courses &amp; certifications
            </motion.p>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <CertificateCarousel />
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <a
            href={cvData.linkedinCertifications}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-lg hover:ring-indigo-200"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-white">
              <LinkedInIcon className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-slate-900">
                View All
              </span>
              <span className="block text-xs text-slate-500">
                All certificates on LinkedIn
              </span>
            </span>
            <span
              className="ml-1 text-slate-400 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              ↗
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}