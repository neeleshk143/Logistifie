const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task',
    password: 'root',
    dialect: "postgres",
    port: 5432,
});

module.exports = pool;
