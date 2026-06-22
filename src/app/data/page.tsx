"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { fetchDataList } from "../actions";

interface DataItem {
  id: string;
  paket: string;
  dalamNegeri: string;
  jenisPengadaan: string;
  metode: string;
  lembaga: string;
  satker: string;
  lokasi: string;
  pagu: string;
  waktu: string;
  sumberDana: string;
  isUMKM: string;
  uraianPekerjaan: string;
  spesifikasi: string;
  ownerType: string;
  p10: string;
  p90: string;
  skorRisiko: string;
  kategori: string;
}

export default function DataPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("risk_desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalData / pageSize) || 1;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchDataList(page, pageSize, searchQuery, categoryFilter, sortBy);
        setData(result.data);
        setTotalData(result.totalData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    const timer = setTimeout(() => {
      loadData();
    }, 300); // debounce search
    
    return () => clearTimeout(timer);
  }, [page, pageSize, searchQuery, categoryFilter, sortBy]);

  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-heading">Eksplorasi Data</h1>
          <p className="text-slate-500 mt-2 font-sans">Menampilkan hasil analisis dari total 3.000.000+ data pengadaan.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari paket / lembaga..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="font-sans pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64 transition-shadow"
            />
          </div>
          
          <div className="relative">
            <select 
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="font-sans appearance-none pl-4 pr-10 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full transition-shadow cursor-pointer"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Anomali Ekstrem">Anomali Ekstrem</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="font-sans appearance-none pl-4 pr-10 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full transition-shadow cursor-pointer"
            >
              <option value="risk_desc">Risiko (Tinggi ke Rendah)</option>
              <option value="risk_asc">Risiko (Rendah ke Tinggi)</option>
              <option value="pagu_desc">Pagu (Besar ke Kecil)</option>
              <option value="pagu_asc">Pagu (Kecil ke Besar)</option>
              <option value="waktu_desc">Waktu (Terbaru)</option>
              <option value="waktu_asc">Waktu (Terlama)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200 whitespace-nowrap">
              <tr>
                <th className="px-6 py-4">Aksi</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Kategori Risiko</th>
                <th className="px-6 py-4">Skor Risiko</th>
                <th className="px-6 py-4">Lembaga / Instansi</th>
                <th className="px-6 py-4">Pagu</th>
                <th className="px-6 py-4">Waktu</th>
              </tr>
            </thead>
            <tbody className={loading ? "opacity-50 pointer-events-none" : ""}>
              {data.map((item, index) => (
                <React.Fragment key={item.id + index}>
                  <tr 
                    onClick={() => toggleRow(item.id)}
                    className={`border-b border-slate-100 transition-colors cursor-pointer ${expandedRow === item.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4">
                      {expandedRow === item.id ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                    <td className="px-6 py-4 min-w-[300px] max-w-sm truncate text-slate-800 font-medium">{item.paket}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        item.kategori === 'Tinggi' ? 'bg-red-100 text-red-700' :
                        item.kategori === 'Menengah Tinggi' ? 'bg-orange-100 text-orange-700' :
                        item.kategori === 'Menengah Rendah' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{item.skorRisiko}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.lembaga}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-emerald-700">{item.pagu}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.waktu}</td>
                  </tr>
                  
                  <AnimatePresence>
                    {expandedRow === item.id && (
                      <tr className="bg-slate-50/80 border-b border-slate-200">
                        <td colSpan={8} className="p-0">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="md:col-span-2 space-y-6">
                                <div>
                                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Nama Paket Penuh</h4>
                                  <p className="text-slate-900 font-medium leading-relaxed">{item.paket}</p>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Uraian Pekerjaan</h4>
                                  <p className="text-slate-700 leading-relaxed">{item.uraianPekerjaan}</p>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Spesifikasi</h4>
                                  <p className="text-slate-700 leading-relaxed">{item.spesifikasi}</p>
                                </div>
                              </div>
                              
                              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Detail Tambahan</h4>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                                  <span className="text-slate-500">Dalam Negeri</span>
                                  <span className="font-medium text-slate-900">{item.dalamNegeri}</span>
                                  
                                  <span className="text-slate-500">Jenis Pengadaan</span>
                                  <span className="font-medium text-slate-900">{item.jenisPengadaan}</span>
                                  
                                  <span className="text-slate-500">Metode</span>
                                  <span className="font-medium text-slate-900">{item.metode}</span>
                                  
                                  <span className="text-slate-500">Satker</span>
                                  <span className="font-medium text-slate-900">{item.satker}</span>
                                  
                                  <span className="text-slate-500">Lokasi</span>
                                  <span className="font-medium text-slate-900">{item.lokasi}</span>
                                  
                                  <span className="text-slate-500">Sumber Dana</span>
                                  <span className="font-medium text-slate-900">{item.sumberDana}</span>
                                  
                                  <span className="text-slate-500">UMKM</span>
                                  <span className="font-medium text-slate-900">{item.isUMKM}</span>
                                  
                                  <span className="text-slate-500">Owner Type</span>
                                  <span className="font-medium text-slate-900">{item.ownerType}</span>

                                  <div className="col-span-2 mt-2 pt-2 border-t border-slate-100 flex justify-between">
                                    <div className="flex flex-col">
                                      <span className="text-xs text-slate-500 uppercase font-bold">P10</span>
                                      <span className="font-mono font-medium text-slate-700">{item.p10}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                      <span className="text-xs text-slate-500 uppercase font-bold">P90</span>
                                      <span className="font-mono font-medium text-slate-700">{item.p90}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-200 bg-slate-50/50 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Tampilkan</span>
            <select 
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
            <span className="text-sm text-slate-500">dari {totalData.toLocaleString('id-ID')} data</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-700 font-medium">Halaman</span>
              <input 
                type="number" 
                value={page}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 1 && val <= totalPages) setPage(val);
                }}
                className="w-16 px-2 py-1 text-center text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={1}
                max={totalPages}
              />
              <span className="text-sm text-slate-500">dari {totalPages.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
