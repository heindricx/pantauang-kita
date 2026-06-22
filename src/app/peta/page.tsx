/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { fetchPetaData } from "../actions";

function MapComponent({ mapData, title, dbData }: { mapData: Record<string, unknown>, title: string, dbData: { name: string, value: number }[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !mapData || dbData.length === 0) return;
    
    // Register the map with a unique name based on the title
    const mapName = title === 'Provinsi' ? 'indonesia-prov' : 'indonesia-kab';
    echarts.registerMap(mapName, mapData as any);

    const chartInstance = echarts.init(chartRef.current);
    
    // Use real data from DB
    const data = (mapData.features as Array<Record<string, unknown>>).map((feature: Record<string, any>) => {
      const geoName = feature.properties.PROVINSI || feature.properties.WADMKK || feature.properties.name || "Unknown";
      const matched = dbData.find(d => 
        d.name.toLowerCase() === geoName.toLowerCase() || 
        d.name.toLowerCase().includes(geoName.toLowerCase()) || 
        geoName.toLowerCase().includes(d.name.toLowerCase())
      );
      
      return {
        name: geoName,
        value: matched ? Math.round(matched.value) : 0
      };
    });

    const option: echarts.EChartsOption = {
      title: {
        text: `Peta Persebaran Risiko - Tingkat ${title}`,
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 20
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>Skor Risiko: {c}',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e2e8f0',
        textStyle: { color: '#0f172a', fontWeight: 500 },
        padding: [12, 16],
        extraCssText: 'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); border-radius: 12px;'
      },
      visualMap: {
        min: 0,
        max: 100,
        text: ['Tinggi', 'Rendah'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#10b981', '#facc15', '#f97316', '#ef4444']
        }
      },
      series: [
        {
          name: 'Skor Risiko',
          type: 'map',
          map: mapName,
          nameProperty: title === 'Provinsi' ? 'PROVINSI' : 'WADMKK',
          roam: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0.5
          },
          emphasis: {
            label: { show: true },
            itemStyle: {
              areaColor: '#3b82f6'
            }
          },
          data: data
        }
      ]
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [mapData, title, dbData]);

  return <div ref={chartRef} className="w-full h-[600px] rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-slate-50/50" />;
}

export default function PetaPage() {
  const [view, setView] = useState<'provinsi' | 'kabupaten'>('provinsi');
  const [provinsiData, setProvinsiData] = useState<Record<string, unknown> | null>(null);
  const [kabupatenData, setKabupatenData] = useState<Record<string, unknown> | null>(null);
  const [dbData, setDbData] = useState<{provinsi: any[], kabupaten: any[]}>({ provinsi: [], kabupaten: [] });

  useEffect(() => {
    fetch('/provinsi.json').then(res => res.json()).then(setProvinsiData).catch(err => console.error("Error loading provinsi geojson:", err));
    fetch('/kabupaten.json').then(res => res.json()).then(setKabupatenData).catch(err => console.error("Error loading kabupaten geojson:", err));
    fetchPetaData().then(setDbData).catch(console.error);
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Peta Risiko Pengadaan</h1>
          <p className="text-slate-500 mt-2">Persebaran tingkat risiko anomali di seluruh wilayah Indonesia.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setView('provinsi')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${view === 'provinsi' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Provinsi
          </button>
          <button 
            onClick={() => setView('kabupaten')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${view === 'kabupaten' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Kabupaten/Kota
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 md:p-8">
        {view === 'provinsi' && provinsiData ? (
          <MapComponent mapData={provinsiData} title="Provinsi" dbData={dbData.provinsi} />
        ) : view === 'kabupaten' && kabupatenData ? (
          <MapComponent mapData={kabupatenData} title="Kabupaten/Kota" dbData={dbData.kabupaten} />
        ) : (
          <div className="flex items-center justify-center h-[600px] text-slate-400">
            Memuat peta...
          </div>
        )}
      </div>
    </main>
  );
}
