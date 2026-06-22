"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function ChartComponent({ option, style }: { option: echarts.EChartsOption, style?: React.CSSProperties }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | null = null;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(option);
    }

    const handleResize = () => {
      chartInstance?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance?.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px", ...style }} />;
}

export default function InfografisPage() {
  const commonFont = '"Inter", sans-serif';

  const riskDistributionOption: echarts.EChartsOption = {
    tooltip: { 
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#0f172a', fontFamily: commonFont, fontWeight: 500 },
      padding: [12, 16],
      extraCssText: 'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); border-radius: 12px;'
    },
    legend: { 
      bottom: '0%', 
      icon: 'circle',
      textStyle: { fontFamily: commonFont, color: '#64748b' }
    },
    series: [
      {
        name: 'Distribusi Risiko',
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 16,
          borderColor: '#ffffff',
          borderWidth: 4
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { 
            show: true, 
            fontSize: 24, 
            fontWeight: 'bold',
            fontFamily: commonFont,
            color: '#0f172a'
          }
        },
        labelLine: { show: false },
        data: [
          { value: 1048000, name: 'Rendah', itemStyle: { color: '#10b981' } },
          { value: 735000, name: 'Menengah Rendah', itemStyle: { color: '#facc15' } },
          { value: 580000, name: 'Menengah Tinggi', itemStyle: { color: '#f97316' } },
          { value: 484000, name: 'Tinggi', itemStyle: { color: '#ef4444' } }
        ]
      }
    ]
  };

  const trendOption: echarts.EChartsOption = {
    tooltip: { 
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#0f172a', fontFamily: commonFont, fontWeight: 500 },
      padding: [12, 16],
      extraCssText: 'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); border-radius: 12px;'
    },
    legend: { 
      icon: 'circle',
      textStyle: { fontFamily: commonFont, color: '#64748b' },
      bottom: 0
    },
    grid: { left: '2%', right: '4%', top: '10%', bottom: '12%', containLabel: true },
    xAxis: { 
      type: 'category', 
      boundaryGap: false, 
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontFamily: commonFont, color: '#94a3b8', margin: 16 }
    },
    yAxis: { 
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { fontFamily: commonFont, color: '#94a3b8' }
    },
    series: [
      { 
        name: 'Tinggi', 
        type: 'line', 
        smooth: 0.4, 
        symbolSize: 0,
        lineStyle: { width: 4 },
        data: [120, 132, 101, 134, 90, 230, 210], 
        itemStyle: { color: '#ef4444' } 
      },
      { 
        name: 'Menengah', 
        type: 'line', 
        smooth: 0.4, 
        symbolSize: 0,
        lineStyle: { width: 4 },
        data: [220, 182, 191, 234, 290, 330, 310], 
        itemStyle: { color: '#facc15' } 
      },
      { 
        name: 'Rendah', 
        type: 'line', 
        smooth: 0.4, 
        symbolSize: 0,
        lineStyle: { width: 4 },
        data: [150, 232, 201, 154, 190, 330, 410], 
        itemStyle: { color: '#10b981' } 
      }
    ]
  };

  const barOption: echarts.EChartsOption = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#0f172a', fontFamily: commonFont, fontWeight: 500 },
      padding: [12, 16],
      extraCssText: 'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); border-radius: 12px;'
    },
    grid: { left: '2%', right: '4%', top: '5%', bottom: '5%', containLabel: true },
    xAxis: { 
      type: 'value',
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      axisLabel: { fontFamily: commonFont, color: '#94a3b8' }
    },
    yAxis: { 
      type: 'category', 
      data: ['Konstruksi', 'Barang', 'Jasa Konsultansi', 'Jasa Lainnya'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontFamily: commonFont, color: '#64748b', margin: 16, fontWeight: 500 }
    },
    series: [
      {
        name: 'Rata-rata Skor Risiko',
        type: 'bar',
        barWidth: '40%',
        data: [78.5, 45.2, 32.1, 25.8],
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#60a5fa' }
          ])
        }
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 sm:px-8 py-12 animate-in fade-in duration-500 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading mb-3">Infografis Data</h1>
        <p className="text-lg text-slate-500 font-sans max-w-2xl mx-auto">Visualisasi metrik anomali pengadaan yang dirancang dengan presisi, menghadirkan wawasan mendalam secara elegan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Distribusi Kategori Risiko</h2>
            <p className="text-sm text-slate-500 mt-1">Proporsi anomali berdasarkan tingkat keparahan.</p>
          </div>
          <ChartComponent option={riskDistributionOption} style={{ height: "350px" }} />
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tren Anomali Bulanan</h2>
            <p className="text-sm text-slate-500 mt-1">Pergerakan risiko dari waktu ke waktu.</p>
          </div>
          <ChartComponent option={trendOption} style={{ height: "350px" }} />
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 md:col-span-2 hover:shadow-md transition-shadow duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Rata-rata Risiko Berdasarkan Jenis</h2>
            <p className="text-sm text-slate-500 mt-1">Sektor mana yang memiliki rata-rata probabilitas anomali tertinggi.</p>
          </div>
          <ChartComponent option={barOption} style={{ height: "450px" }} />
        </div>
      </div>
    </main>
  );
}
