import type { Metadata } from "next";
import { Source_Sans_3 as FonSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

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
      <body className={` ${fontSans.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col bg-amber-100">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
