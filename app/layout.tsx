import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/ui/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://westufer-kemnade.de'),
  title: {
    default: "Westufer Kemnade | Surfschule & Wassersport im Ruhrgebiet",
    template: "%s | Westufer Kemnade"
  },
  description: "Erlebe Wassersport am Kemnader See: Windsurfen, Stand Up Paddling (SUP) & Longboarden. Kurse, Verleih und Events in Bochum / Witten.",
  keywords: ["Wassersport", "Windsurfen", "SUP", "Stand Up Paddling", "Longboard", "Kemnader See", "Bochum", "Ruhrgebiet", "Surfschule", "Sommeraktivitäten", "Freizeit"],
  openGraph: {
    title: 'Westufer Kemnade',
    description: 'Dein Urlaub am Kemnader See. Windsurfen, SUP & mehr.',
    url: 'https://westufer-kemnade.de',
    siteName: 'Westufer Kemnade',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Westufer Kemnade',
    image: 'https://westufer-kemnade.de/hero-image.jpg',
    description: 'Surfschule und Wassersport-Center am Kemnader See. Windsurfen, SUP, Longboard Verleih und Kurse.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Oveneystraße 71 (Bootshallen Gibraltar)',
      addressLocality: 'Bochum',
      postalCode: '44797',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.424, 
      longitude: 7.265
    },
    url: 'https://westufer-kemnade.de',
    sameAs: [
      'https://www.facebook.com/westuferkemnade'
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '11:00',
        closes: '19:00'
      }
    ]
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
