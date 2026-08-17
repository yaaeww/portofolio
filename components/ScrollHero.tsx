"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@/data/cv";
import { MailIcon, GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/icons";
import { playFrameSound, stopAllSounds } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = 5;
const FRAME_SRC = Array.from(
  { length: FRAMES },
  (_, i) => `/assets/frame_0${i + 1}.jpg`,
);

export default function ScrollHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const lastSoundFrame = useRef(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      const frameEls = gsap.utils.toArray<HTMLElement>(".seq-frame");

      /* ── Frame animation timeline (scrub-driven, pinned) ── */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: ".hero-panel",
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              FRAMES - 1,
              Math.floor(self.progress * FRAMES),
            );
            if (idx !== lastSoundFrame.current) {
              playFrameSound(idx);
              window.dispatchEvent(new CustomEvent("frame-sound"));
              lastSoundFrame.current = idx;
            }
            setActiveFrame(idx);
          },
        },
      });

      frameEls.forEach((frame, i) => {
        if (i === 0) return;
        tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: 1 }, i - 1)
          .fromTo(
            frameEls[i - 1],
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            i - 1,
          );
      });

      /* ── CV card entrance animation (separate ScrollTrigger) ── */
      const cvCard = wrapper.querySelector(".cv-card");
      if (cvCard) {
        const cvTl = gsap.timeline({
          scrollTrigger: {
            trigger: cvCard,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        cvTl
          .fromTo(
            cvCard,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          )
          .fromTo(
            ".cv-label",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.1,
          )
          .fromTo(
            ".cv-name",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            0.2,
          )
          .fromTo(
            ".cv-sub",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            0.3,
          )
          .fromTo(
            gsap.utils.toArray(".cv-badge"),
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              stagger: 0.06,
            },
            0.4,
          )
          .fromTo(
            ".cv-actions",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.5,
          );
      }
    }, wrapper);

    return () => {
      stopAllSounds();
      ctx.revert();
    };
  }, []);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToCv = () => {
    document.getElementById("cv")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef}>
      {/* ── Scroll-driven image animation (pinned) ── */}
      <section ref={sectionRef} className="relative h-[300vh]">
        <div className="hero-panel flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
          <div className="relative w-full max-w-[540px] px-4 sm:max-w-4xl">
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5"
              style={{ aspectRatio: "1521 / 704" }}
            >
              {FRAME_SRC.map((src, i) => (
                <div
                  key={src}
                  className="seq-frame absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <Image
                    src={src}
                    alt={`Animation sequence frame ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 92vw, 896px"
                    className="object-cover"
                    priority={i === 0}
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 [@media(max-height:520px)]:hidden sm:mt-8">
              {Array.from({ length: FRAMES }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeFrame ? "w-8 bg-slate-800" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <p
              className={`mt-4 text-center text-sm font-medium text-slate-400 transition-opacity duration-500 [@media(max-height:520px)]:hidden ${
                activeFrame === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              Scroll down to play the animation ▾
            </p>
          </div>
        </div>
      </section>

      {/* ── CV Introduction Card (separate section, normal flow) ── */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-16">
        <div className="cv-card mx-auto w-[min(92%,640px)] rounded-2xl bg-white/85 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur-md sm:p-7">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-5">
            <div className="cv-photo relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white sm:h-28 sm:w-28">
              <Image
                src="/assets/image.png"
                alt={cvData.name}
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="cv-label text-[10px] font-semibold uppercase tracking-widest text-indigo-600 sm:text-xs">
                Hello, I am
              </p>
              <h1 className="cv-name mt-1 break-words text-[clamp(1.15rem,4.6vw,1.875rem)] font-bold leading-tight text-slate-900">
                {cvData.name}
              </h1>
              <p className="cv-sub mt-1 text-[clamp(0.8rem,2.6vw,1rem)] font-medium text-slate-600">
                {cvData.title}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-4 sm:justify-start sm:gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cv-badge rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 ring-1 ring-indigo-100 sm:px-3 sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="cv-actions mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3">
            <button
              onClick={goToCv}
              className="w-full rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 sm:w-auto sm:px-6 sm:py-2.5"
            >
              View Full CV
            </button>
            <button
              onClick={replay}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto sm:px-6 sm:py-2.5"
            >
              ↻ Replay Animation
            </button>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-black/5 pt-4 text-sm text-slate-500">
            <a
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
              href={`mailto:${cvData.email}`}
            >
              <MailIcon className="h-4 w-4" />
              {cvData.email}
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
              href={cvData.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
              href={cvData.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              className="inline-flex items-center gap-1.5 hover:text-slate-800"
              href="https://www.instagram.com/yaaewww_?igsh=MXJwdzZxbGxxaTlhbQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}