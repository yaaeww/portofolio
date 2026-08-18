import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ihya 'Ulumuddin — Backend & Full Stack Software Engineer",
  description:
    "Backend & Full Stack Software Engineer specializing in Go, PostgreSQL, Node.js, Docker, and scalable payment systems. Portfolio and case studies.",
  openGraph: {
    title: "Muhammad Ihya 'Ulumuddin — Backend & Full Stack Software Engineer",
    description: "Go · PostgreSQL · Node.js · Docker · Redis · React · TypeScript",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ihya 'Ulumuddin — Backend & Full Stack Software Engineer",
    description: "Go · PostgreSQL · Node.js · Docker · Redis · React · TypeScript",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('portfolio-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
