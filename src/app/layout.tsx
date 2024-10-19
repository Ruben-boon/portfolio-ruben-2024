import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import "./tailwind.css";
import "../Sass/main.scss";
import { DarkModeProvider } from "@/ui/DarkModeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const epilogueVar = localFont({
  src: "./fonts/Epilogue-VariableFont_wght.ttf",
  variable: "--epilogue-variable",
  weight: "100 900",
});
const ptSerif = localFont({
  src: "./fonts/PTSerif-Regular.ttf",
  variable: "--font-pt-serif",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Camonauts",
  description: "Websites from space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${epilogueVar.variable} ${geistMono.variable} ${ptSerif.variable} antialiased`}
      >
        <DarkModeProvider>
          <Header />
          {children}
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
