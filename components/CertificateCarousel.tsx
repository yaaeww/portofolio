"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cvData } from "@/data/cv";

export default function CertificateCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ],
  );
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMuteChange = useCallback(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;
    const muted = localStorage.getItem("portfolio-sound-muted") !== "0";
    if (muted) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    window.addEventListener("sound-toggle", handleMuteChange);
    return () => window.removeEventListener("sound-toggle", handleMuteChange);
  }, [handleMuteChange]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      const max = emblaApi.scrollSnapList().length - 1;
      setProgress(max > 0 ? emblaApi.selectedScrollSnap() / max : 0);
    };
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    emblaApi.on("scroll", () => {
      const max = emblaApi.scrollSnapList().length - 1;
      setProgress(max > 0 ? emblaApi.scrollProgress() : 0);
    });
    const raf = requestAnimationFrame(sync);
    return () => {
      emblaApi.off("select", sync);
      cancelAnimationFrame(raf);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    clearTimeout(timerRef.current!);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    clearTimeout(timerRef.current!);
  }, [emblaApi]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {cvData.certificates.length} certificates — swipe or use the arrows
        </p>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous certificates"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next certificates"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cvData.certificates.map((cert) => (
            <div
              key={cert.title}
              className="min-w-0 flex-[0_0_100%] pl-3 first:pl-0 sm:flex-[0_0_50%] sm:pl-4 lg:flex-[0_0_33.333%]"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md dark:bg-slate-900 dark:ring-white/10">
                <div className="relative aspect-video w-full shrink-0">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 340px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400 dark:bg-slate-800">
                      Certificate image coming soon
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
                  <h4 className="text-base font-bold leading-snug text-slate-900 line-clamp-2 dark:text-white">
                    {cert.title}
                  </h4>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {cert.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-indigo-500 transition-[width] duration-300 ease-out"
          style={{ width: `${Math.max(progress * 100, 4)}%` }}
        />
      </div>
    </div>
  );
}
