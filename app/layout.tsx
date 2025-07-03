import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PitchLab - AI Co-Founders for Your Startup",
  description: "Build your startup with AI co-founders. Get expert guidance from specialized AI agents for CTO, CMO, CFO, and Architecture decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
  
