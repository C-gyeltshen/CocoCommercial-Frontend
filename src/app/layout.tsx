import type { Metadata } from "next";
import { Averia_Serif_Libre, Lato } from 'next/font/google';
import "./globals.css";

// Configure Averia Serif Libre for headers
const averiaSerifLibre = Averia_Serif_Libre({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-averia',
  display: 'swap',
});

// Configure Lato for body text
const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Coco Commercial - Where Happiness Meets Business",
  description: "Connecting Bhutanese Businesses to Broader Markets - Empowering local businesses through affordable e-commerce solutions.",
  keywords: "Bhutan, e-commerce, local business, digital marketplace, online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${averiaSerifLibre.variable} ${lato.variable} font-lato antialiased`}
      >
        {children}
      </body>
    </html>
  );
}