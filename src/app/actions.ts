"use server";

import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function fetchInfografisData() {
  try {
    const riskQuery = `SELECT kategori_risiko, COUNT(*) as count FROM procurement_anomalies GROUP BY kategori_risiko`;
    const trendQuery = `
      SELECT bulan_pemilihan, 
             SUM(CASE WHEN kategori_risiko = 'Tinggi' OR kategori_risiko = 'Anomali Ekstrem' THEN 1 ELSE 0 END) as tinggi,
             SUM(CASE WHEN kategori_risiko = 'Sedang' THEN 1 ELSE 0 END) as menengah,
             SUM(CASE WHEN kategori_risiko = 'Rendah' THEN 1 ELSE 0 END) as rendah
      FROM procurement_anomalies 
      WHERE bulan_pemilihan > 0
      GROUP BY bulan_pemilihan 
      ORDER BY bulan_pemilihan ASC
      LIMIT 12
    `;
    const barQuery = `
      SELECT jenis as jenisPengadaan, AVG(skor_risiko) as avgRisk 
      FROM procurement_anomalies 
      GROUP BY jenis 
      ORDER BY avgRisk DESC 
      LIMIT 5
    `;

    const [riskResult] = await pool.execute<RowDataPacket[]>(riskQuery);
    const [trendResult] = await pool.execute<RowDataPacket[]>(trendQuery);
    const [barResult] = await pool.execute<RowDataPacket[]>(barQuery);

    return {
      riskDistribution: riskResult.map(r => ({
        name: r.kategori_risiko || 'Rendah',
        value: Number(r.count) || 0
      })),
      trend: trendResult.map(r => ({
        bulan: Number(r.bulan_pemilihan),
        tinggi: Number(r.tinggi),
        menengah: Number(r.menengah),
        rendah: Number(r.rendah)
      })),
      bar: barResult.map(r => ({
        name: r.jenisPengadaan || 'UNKNOWN',
        avgRisk: Number(r.avgRisk) || 0
      }))
    };
  } catch (error) {
    console.error("Fetch Infografis Error:", error);
    throw new Error("Failed to fetch infografis data from database.");
  }
}

export async function fetchPetaData() {
  try {
    const provQuery = `
      SELECT provinsi as name, AVG(skor_risiko) as value 
      FROM procurement_anomalies 
      WHERE provinsi IS NOT NULL AND provinsi != ''
      GROUP BY provinsi
    `;
    const kabQuery = `
      SELECT kota as name, AVG(skor_risiko) as value 
      FROM procurement_anomalies 
      WHERE kota IS NOT NULL AND kota != ''
      GROUP BY kota
    `;

    const [provResult] = await pool.execute<RowDataPacket[]>(provQuery);
    const [kabResult] = await pool.execute<RowDataPacket[]>(kabQuery);

    return {
      provinsi: provResult.map(r => ({ name: r.name, value: Number(r.value) })),
      kabupaten: kabResult.map(r => ({ name: r.name, value: Number(r.value) }))
    };
  } catch (error) {
    console.error("Fetch Peta Error:", error);
    throw new Error("Failed to fetch peta data from database.");
  }
}

export async function fetchDataList(page: number, pageSize: number, search: string) {
  try {
    const offset = (page - 1) * pageSize;
    let baseQuery = `FROM procurement_anomalies`;
    let countQuery = `SELECT COUNT(*) as total FROM procurement_anomalies`;
    const params: string[] = [];
    const searchParams: string[] = [];

    if (search) {
      const searchCondition = ` WHERE agenda LIKE ? OR lembaga LIKE ?`;
      baseQuery += searchCondition;
      countQuery += searchCondition;
      const likeSearch = `%${search}%`;
      params.push(likeSearch, likeSearch);
      searchParams.push(likeSearch, likeSearch);
    }

    const dataQuery = `SELECT * ${baseQuery} ORDER BY skor_risiko DESC LIMIT ${pageSize} OFFSET ${offset}`;

    const [[countResult]] = await pool.execute<RowDataPacket[]>(countQuery, searchParams);
    const [rows] = await pool.execute<RowDataPacket[]>(dataQuery, params);

    const totalData = Number(countResult.total) || 0;

    return {
      data: rows.map(r => ({
        id: r.id || Math.random().toString(), // We don't have ID in table, fallback
        paket: r.agenda,
        dalamNegeri: r.dalam_negeri,
        jenisPengadaan: r.jenis,
        metode: r.metode,
        lembaga: r.lembaga,
        satker: r.satker,
        lokasi: r.kota || r.provinsi,
        pagu: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(r.pagu) || 0),
        waktu: `${r.tahun_pemilihan || 2026}-${String(r.bulan_pemilihan || 1).padStart(2, '0')}`,
        sumberDana: r.sumber_dana,
        isUMKM: r.is_umkm,
        uraianPekerjaan: `Uraian tidak tersedia di database.`,
        spesifikasi: `Spesifikasi tidak tersedia di database.`,
        ownerType: r.owner_type,
        p10: Number(r.p10 || 0).toFixed(2),
        p90: Number(r.p90 || 0).toFixed(2),
        skorRisiko: Number(r.skor_risiko || 0).toFixed(2),
        kategori: r.kategori_risiko
      })),
      totalData
    };
  } catch (error) {
    console.error("Fetch Data List Error:", error);
    throw new Error("Failed to fetch data list from database.");
  }
}
