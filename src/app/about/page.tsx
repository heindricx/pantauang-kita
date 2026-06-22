"use client";

import { Info, ShieldCheck, ActivitySquare } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 sm:px-8 py-12 animate-in fade-in duration-500 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Tentang PantaUang Kita</h1>
        <p className="text-lg text-slate-500">Mewujudkan pengadaan barang dan jasa pemerintah yang bersih, transparan, dan akuntabel.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Info className="w-6 h-6 text-blue-600" />
          Apa itu PantaUang Kita?
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
          <p>
            <strong>PantaUang Kita</strong> adalah sebuah platform inovatif berbasis kecerdasan buatan (Artificial Intelligence) yang dirancang secara khusus untuk mendeteksi potensi anomali dan risiko kecurangan pada proses pengadaan barang dan jasa pemerintah (PBJP) di Indonesia.
          </p>
          <p>
            Dengan memanfaatkan jutaan data historis pengadaan, sistem kami menganalisis pola, tren, dan perilaku anomali untuk memberikan peringatan dini (early warning system) kepada para pemangku kepentingan. Hal ini sangat krusial untuk mencegah terjadinya kerugian negara.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl p-8 md:p-12 shadow-lg mb-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <ActivitySquare className="w-6 h-6 text-blue-200" />
          Metodologi & Cara Kerja
        </h2>
        <div className="space-y-4 text-blue-50">
          <p>
            PantaUang Kita menggunakan model <em>Machine Learning</em> yang telah dilatih menggunakan jutaan data set PBJP. Berikut adalah tahapan cara kerja klasifikasi risiko yang kami laksanakan:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              { title: "1. Pengumpulan Data", desc: "Sistem mengekstraksi data mentah PBJP yang mencakup pagu, HPS, metode pengadaan, jenis pengadaan, dan waktu." },
              { title: "2. Prapemrosesan (Preprocessing)", desc: "Pembersihan data, penanganan missing values, dan encoding variabel kategorikal menjadi format yang dapat dipahami model." },
              { title: "3. Ekstraksi Fitur (Feature Engineering)", desc: "Membuat fitur turunan baru yang mencerminkan indikator kecurangan, seperti selisih HPS dengan Pagu, atau durasi tender yang tidak wajar." },
              { title: "4. Pemodelan & Klasifikasi", desc: "Menggunakan algoritma gradient boosting (LightGBM) yang mendeteksi anomali (P10 & P90) dan menghasilkan Skor Risiko (0-100)." },
            ].map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-blue-100">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          Kategori Risiko
        </h2>
        <p className="text-slate-600 mb-6">Sistem kami mengklasifikasikan pengadaan ke dalam empat tingkat risiko untuk memudahkan prioritas audit:</p>
        
        <ul className="space-y-4">
          {[
            { cat: "Tinggi", color: "bg-red-100 text-red-700", desc: "Terdeteksi anomali yang sangat signifikan, probabilitas penyimpangan besar. Wajib dilakukan audit investigatif." },
            { cat: "Menengah Tinggi", color: "bg-orange-100 text-orange-700", desc: "Terdapat pola yang mencurigakan di luar standar batas wajar, membutuhkan review dokumen lanjutan." },
            { cat: "Menengah Rendah", color: "bg-yellow-100 text-yellow-700", desc: "Anomali minor yang mungkin disebabkan oleh kesalahan administratif. Perlu pengawasan." },
            { cat: "Rendah", color: "bg-emerald-100 text-emerald-700", desc: "Proses pengadaan berjalan wajar dan sesuai dengan pola historis normal." },
          ].map((item, idx) => (
            <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold min-w-[150px] text-center ${item.color}`}>
                {item.cat}
              </span>
              <span className="text-slate-600 text-sm flex-1">{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
