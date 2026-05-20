import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sanjay Sharma — Senior Android & Flutter Developer",
  description:
    "Senior Android & Flutter Developer. 30+ apps built. AI integration specialist. Flutter package publisher on pub.dev.",
  keywords: ["Sanjay Sharma", "Flutter Developer", "Android Developer", "pub.dev", "AI Integration"],
  authors: [{ name: "Sanjay Sharma" }],
  creator: "Sanjay Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanjaysharma.info",
    title: "Sanjay Sharma — Senior Android & Flutter Developer",
    description: "Senior Android & Flutter Developer. 30+ apps built. AI integration specialist.",
    siteName: "Sanjay Sharma Portfolio",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Prevent FOUC for theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
