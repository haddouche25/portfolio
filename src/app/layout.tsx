import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mhaddouche.com"),
  title: {
    default: "Mohamed Haddouche | Math Coach & Software Engineer",
    template: "%s | Mohamed Haddouche",
  },
  description:
    "Coaching en mathématiques (Lycée, 1Bac SM) et ingénierie logicielle : cours, QCM interactifs et tutoriels.",
  keywords: [
    "Math Coach",
    "Software Engineer",
    "Didactique Mathématique",
    "Next.js",
    "Tronc Commun",
    "1Bac SM",
    "QCM Didactique",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/icon-192.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MHaddouche",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Mohamed Haddouche",
    locale: "fr_FR",
    url: "/",
    title: "Mohamed Haddouche | Math Coach & Software Engineer",
    description:
      "Coaching en mathématiques (Lycée, 1Bac SM) et ingénierie logicielle : cours, QCM interactifs et tutoriels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Haddouche | Math Coach & Software Engineer",
    description:
      "Coaching en mathématiques (Lycée, 1Bac SM) et ingénierie logicielle : cours, QCM interactifs et tutoriels.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
