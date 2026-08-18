import { cvData } from "@/data/cv";
import { MailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-slate-900 px-4 py-16 text-white dark:bg-slate-950 sm:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s Connect</h2>
        <p className="mt-3 text-slate-400">
          Open to backend and full-stack engineering opportunities.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${cvData.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <MailIcon className="h-4 w-4" />
            Email
          </a>
          <a
            href={cvData.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={cvData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>

        <a
          href="/cv/muhammad-ihya-ulumuddin-cv.pdf"
          download
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
        >
          Download CV ↓
        </a>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © 2026 Muhammad Ihya &apos;Ulumuddin
      </div>
    </section>
  );
}
