import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Belize Fishing | Premium Fishing Equipment",
    template: "%s | Belize Fishing",
  },
  description:
    "Premium fishing equipment curated for Caribbean waters. Gear up for the ultimate Belize fishing experience.",
  metadataBase: new URL("https://belizefishing.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://belizefishing.com",
    siteName: "Belize Fishing",
    title: "Belize Fishing | Premium Fishing Equipment",
    description:
      "Premium fishing equipment curated for Caribbean waters. Gear up for the ultimate Belize fishing experience.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Belize Fishing - Premium Fishing Equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belize Fishing | Premium Fishing Equipment",
    description:
      "Premium fishing equipment curated for Caribbean waters. Gear up for the ultimate Belize fishing experience.",
    images: ["/og-image.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('belize-fishing-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} antialiased bg-sand-light dark:bg-dark-bg text-deep-ocean dark:text-dark-text transition-colors duration-300`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-6 focus:py-3 focus:bg-tropical-teal focus:text-white focus:rounded-full focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
