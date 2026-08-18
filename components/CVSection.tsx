"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cvData } from "@/data/cv";
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

const skillIcons: Record<FeaturedSkill["icon"], React.ComponentType<{ className?: string }>> = {
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
  brain: "from-indigo-500 to-violet-500",
  layers: "from-sky-500 to-cyan-500",
  trend: "from-amber-500 to-orange-500",
  shield: "from-rose-500 to-pink-500",
  database: "from-teal-500 to-emerald-500",
  server: "from-slate-600 to-slate-800",
  layout: "from-fuchsia-500 to-purple-500",
  cloud: "from-blue-500 to-indigo-500",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const textContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={item}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
    >
      {project.image && (
        <div         className="mb-4 overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <h4 className="text-base font-bold text-slate-900 dark:text-white">{project.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-black/5 dark:bg-slate-800 dark:text-slate-400 dark:ring-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
      >
        {expanded ? "Show Less ▴" : "Read Case Study ▾"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-5 border-t border-black/5 pt-5 dark:border-white/10">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Problem
                </h5>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.problem}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Architecture &amp; Decisions
                </h5>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.architecture}
                </p>
              </div>

              {project.contributions && project.contributions.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Key Contributions
                  </h5>
                  <div className="mt-3 space-y-3">
                    {project.contributions.map((c) => (
                      <div
                        key={c.title}
                        className="rounded-xl bg-slate-50 p-4 ring-1 ring-black/5"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {c.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">
                          {c.detail}
                        </p>
                        {c.points && c.points.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {c.points.map((pt) => (
                              <li
                                key={pt}
                                className="flex gap-2 text-xs text-slate-500"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Impact
                </h5>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CVSection() {
  const [certVisible, setCertVisible] = useState(false);
  const certHeadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = certHeadingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !certVisible) {
          setCertVisible(true);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [certVisible]);

  return (
    <section id="cv" className="scroll-mt-8 bg-dot-pattern bg-slate-50 px-4 py-20 sm:py-24 dark:bg-slate-950">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mx-auto max-w-6xl"
      >
        {/* ── About + Education ── */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <motion.h3
                variants={textItem}
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                About
              </motion.h3>
              <motion.p
                variants={textItem}
                className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {cvData.summary}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <motion.h3
                variants={textItem}
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Education
              </motion.h3>
              <div className="mt-3 space-y-3">
                {cvData.education.map((edu) => (
                  <div
                    key={edu.school}
                    className="rounded-xl bg-slate-50 p-3 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10"
                  >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {edu.school}
                    </p>
                    {edu.degree && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{edu.degree}</p>
                    )}
                    <p className="mt-1 text-[11px] text-slate-400">
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Data Diri + Lokasi ── */}
        <div id="personal" className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 sm:mt-16">
          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <motion.h3
                variants={textItem}
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Data Diri
              </motion.h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Tempat, Tanggal Lahir", value: `${cvData.personalInfo.birthPlace}, ${cvData.personalInfo.birthDate}` },
                  { label: "Alamat", value: cvData.personalInfo.address },
                  { label: "Tinggi Badan", value: cvData.personalInfo.height },
                  { label: "Berat Badan", value: cvData.personalInfo.weight },
                  { label: "Hobi", value: cvData.personalInfo.hobbies.join(", ") },
                  { label: "Status", value: cvData.personalInfo.maritalStatus },
                ].map((item) => (
                  <motion.div key={item.label} variants={textItem} className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{item.label}</span>
                    <span className="text-sm text-slate-800 dark:text-slate-200">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <motion.h3
                variants={textItem}
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Lokasi
              </motion.h3>
              <motion.div variants={textItem} className="mt-4 overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
                <iframe
                  src={cvData.personalInfo.mapEmbedSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Projects (Case Study Accordion) ── */}
        <div id="projects">
          <motion.div
            variants={item}
            className="mb-6 mt-14 flex items-end justify-between gap-4 sm:mt-16"
          >
            <motion.h3
              variants={textItem}
              className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
            >
              Featured Projects
            </motion.h3>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {cvData.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.a
              variants={textItem}
              href={cvData.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              More Projects on GitHub →
            </motion.a>
            <motion.a
              variants={textItem}
              href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTYzNDkxNzc4NDA2MzI5?igsh=MTFpbXh5c2ZtM3hkdQ%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:from-purple-700 hover:to-pink-600"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              More Projects on Instagram →
            </motion.a>
          </div>
        </div>

        {/* ── Experience + Organizations (Side by Side) ── */}
        <div id="experience" className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {/* Experience */}
          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.h3
                  variants={textItem}
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
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
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {cvData.experience.role}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {cvData.experience.company}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {cvData.experience.duration}
                </span>
              </motion.div>
              <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                {cvData.experience.points.map((point) => (
                  <motion.li
                    key={point}
                    variants={textItem}
                    className="flex gap-2.5"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span className="text-sm leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
              {cvData.experience.images && cvData.experience.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {cvData.experience.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${cvData.experience.company} evidence`}
                      className="h-24 w-full rounded-md object-cover ring-1 ring-black/10 dark:ring-white/10"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Organizations */}
          <motion.div
            variants={item}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7"
          >
            <motion.div variants={textContainer}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <motion.h3
                  variants={textItem}
                  className="text-lg font-bold text-slate-900 dark:text-white"
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
                    className="rounded-xl bg-slate-50 p-4 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {org.role}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {org.organization}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {org.duration}
                      </span>
                    </div>
                    {org.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {org.description}
                      </p>
                    ) : null}
                    {org.images && org.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {org.images.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={`${org.role} evidence`}
                            className="h-16 w-full rounded-md object-cover ring-1 ring-black/10 dark:ring-white/10"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Featured Skills ── */}
        <motion.div
          id="skills"
          variants={item}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 sm:p-7 md:col-span-2"
        >
          <motion.div variants={textContainer}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <motion.h3
                variants={textItem}
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Technical Skills
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
                    className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-indigo-100 dark:bg-slate-800 dark:ring-white/10 dark:hover:ring-indigo-500/30"
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${skillGradients[skill.icon]} text-white shadow-sm transition-transform group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                      {skill.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {skill.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skill.skills.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-300 dark:ring-white/10"
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

        {/* ── Certificates ── */}
        <div ref={certHeadingRef}>
          <motion.div
            variants={item}
            className="mb-6 mt-14 flex items-end justify-between gap-4 sm:mt-16"
          >
            <motion.h3
              variants={textItem}
              className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
            >
              Certificates
            </motion.h3>
            <motion.p
              variants={textItem}
              className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block"
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
