"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function RiskDistributionChart({ data }: { data: Array<Record<string, unknown>> }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current); // Removed "dark" theme
    
    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: { trigger: "item" },
      legend: {
        bottom: '5%',
        left: 'center',
        textStyle: { color: '#475569' } // slate-600
      },
      series: [
        {
          name: "Risiko Pengadaan",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: "#ffffff", borderWidth: 2 },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#0f172a' // slate-900
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };

    chartInstance.setOption(option);
    
    const handleResize = () => chartInstance.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-[400px]" />;
}
