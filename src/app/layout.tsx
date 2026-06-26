import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import "rc-drawer/assets/index.css";
import "@styles/globals.css";

// Components & Constants
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA, SITE_NAME, SITE_URL } from "@constants/seoContants";

const inter = Inter({
  subsets: ["latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap", // Professional standard for performance
});

// Editorial display face for the NextBridge Limited brand.
// Exposed as --font-playfair → consumed by tailwind `font-serif`/`font-display`.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// 1. Professional Viewport Configuration
// Separated from metadata as per Next.js 15+ standards
export const viewport: Viewport = {
  themeColor: "#0a1620",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // Ensures app fills the screen on iPhone notches
};

// 2. World-Class Metadata Configuration
const { description, keywords, title, url, ogImage } = SEODATA.default;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`, // Allows sub-pages to have "Page Title | nextBridgea"
  },
  description: description,
  keywords: keywords,
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
    // startupImage: [] <-- Add your pwa-asset-generator links here
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/nextbridge-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png", // Standard Apple icon path
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#0A48B2",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: title,
    description: description,
    images: [
      {
        url: ogImage ?? "",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable}`}>
      <body
        className={`${inter.className} w-full min-h-screen antialiased bg-background text-dark`}>
        <AppProvider>
          {/* Main Content */}
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
