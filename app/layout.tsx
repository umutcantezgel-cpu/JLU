import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'JLU Gießen Accounting Tutor — Bibi & Rabia Edition',
  description:
    'Interaktiver Accounting-Tutor für Buchführung & Kostenrechnung am FB 02 der Justus-Liebig-Universität Gießen mit Buchungs-Arena, Fehler-Studio, KI-Copilot und Klausur-Simulator.',
  openGraph: {
    title: 'JLU Gießen Accounting Tutor — Bibi & Rabia Edition',
    description:
      'Interaktiver Accounting-Tutor für Buchführung & Kostenrechnung am FB 02 der Justus-Liebig-Universität Gießen.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JLU Gießen Accounting Tutor',
    description:
      'Interaktiver Accounting-Tutor für Buchführung & Kostenrechnung am FB 02 der Justus-Liebig-Universität Gießen.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background text-text-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
