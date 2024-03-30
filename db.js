const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'e-hotel',
  password: 'eHotel!',
  port: 4100,
});

module.exports = pool;