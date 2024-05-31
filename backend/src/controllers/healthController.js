const pool = require('../db');

exports.checkDatabaseConnection = async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).send('Database connection is healthy');
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
};
