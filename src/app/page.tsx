"use client";

import Link from "next/link";
import { ArrowRight, ShieldAlert, Activity, Database, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 bg-slate-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 blur-[100px]" />
      </div>

      <div className="z-10 container mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200/60 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-700">Live: 3.000.000+ Data Analisis</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl"
        >
          Intelijen Pengadaan <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            Transparan & Akurat
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
        >
          Platform PantaUang Kita menyediakan analisis risiko pengadaan barang dan jasa pemerintah menggunakan machine learning mutakhir. 
          Eksplorasi hasil training dan testing klasifikasi risiko dengan mudah.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/data" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
            Eksplorasi Data
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/peta" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all hover:shadow-xl hover:-translate-y-1">
            Lihat Peta Risiko
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24"
        >
          {[
            { icon: Database, label: "Total Data", value: "3.2M+", color: "text-blue-600", bg: "bg-blue-100" },
            { icon: ShieldAlert, label: "Risiko Tinggi", value: "14.5%", color: "text-red-600", bg: "bg-red-100" },
            { icon: FileText, label: "Total Anggaran", value: "Rp 1.200T", color: "text-emerald-600", bg: "bg-emerald-100" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start p-6 bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl shadow-slate-200/40 rounded-3xl transition-transform hover:-translate-y-2">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
