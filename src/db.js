import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST, // <-- Lee de Render
  user: process.env.DB_USER, // <-- Lee de Render
  password: process.env.DB_PASSWORD, // <-- Lee de Render
  database: process.env.DB_DATABASE, // <-- Lee de Render
  port: process.env.DB_PORT, // <-- Lee de Render (4000)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Añade esto para la conexión segura a TiDB
  ssl: {
    rejectUnauthorized: true 
  }
});

export default pool;