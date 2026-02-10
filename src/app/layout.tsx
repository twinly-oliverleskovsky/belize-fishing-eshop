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
  title: "Belize Fishing | Premium Fishing Equipment",
  description:
    "Premium fishing equipment curated for Caribbean waters. Gear up for the ultimate Belize fishing experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
