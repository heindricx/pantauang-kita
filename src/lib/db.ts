import mysql from 'mysql2/promise';

// Koneksi ke TiDB Serverless (MySQL interface)
const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: 'KnokxJmGN7Viird.root',
  password: 'O3GrrtV167xYXanO',
  database: 'test',
  ssl: {
    rejectUnauthorized: false
  },
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

export default pool;
