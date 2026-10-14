require('dotenv').config();

const mysql = require('mysql2/promise');

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to Hostinger MySQL!');

    const [rows] = await connection.query(
      'SELECT NOW() AS server_time'
    );

    console.log(rows);

    await connection.end();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

connectDB();