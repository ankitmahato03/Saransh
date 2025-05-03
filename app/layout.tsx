import type { Metadata } from "next";
import { Source_Sans_3 as FonSans } from "next/font/google";
import "./globals.css";

const fontSans = FonSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});



export const metadata: Metadata = {
  title: "Saransh - AI-Powered PDF Summmarizor",
  description:
    "Save Hours Of Readng Time > Transfrom lengthy PDFs into clear , accurate summaries in seconds with our advance AI technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${fontSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
