import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PantaUang Kita | Government Intelligence Dashboard",
  description: "Deteksi anomali pengadaan barang dan jasa pemerintah menggunakan AI.",
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
            PantaUang
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/infografis" className="hover:text-blue-600 transition-colors">Infografis</Link>
          <Link href="/peta" className="hover:text-blue-600 transition-colors">Peta</Link>
          <Link href="/data" className="hover:text-blue-600 transition-colors">Data</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PantaUang Kita. All rights reserved.</p>
        <p className="mt-1">Sistem Intelijen Pengadaan Pemerintah - Powered by Next.js & LightGBM</p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}
      >
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
