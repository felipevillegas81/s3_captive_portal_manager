import pg from 'pg';
import config from '../config/dotenv.config.js';

const { Pool } = pg;

const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: String(config.DB_PASSWORD),
  database: config.DB_NAME,
});

// console.log('Conectando con:');
// console.log({
//   user: config.DB_USER,
//   host: config.DB_HOST,
//   database: config.DB_NAME,
//   port: config.DB_PORT,
// });

pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error al conectar a PostgreSQL', err.stack);
  }
  console.log('✅ Conectado a PostgreSQL');
  release();
});

export default pool;
