import type { Metadata } from "next";
import { Cinzel, IM_Fell_English } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const fell = IM_Fell_English({
  variable: "--font-fell",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game of Thrones House Trial",
  description: "Discover your true allegiance in Westeros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${fell.variable} antialiased bg-got-black text-got-text font-body selection:bg-got-crimson selection:text-got-gold overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
