const pool = require('./db');
// console.log(pool)
const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                name VARCHAR(100)
               
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price NUMERIC(10, 2) NOT NULL,
                created_by INTEGER NOT NULL,
                FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
            )
        `);
    } catch (error) {
        console.error('Error creating tables', error);
        throw error; // Ensure error is thrown to be caught in server.js
    }
};
// console.log("outside of the table")

module.exports = createTables;
