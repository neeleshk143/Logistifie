const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password, email, name } = req.body;
        console.log(req.body.email)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, password, email, name) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, email, name],
         
        );
        res.status(201).json(newUser.rows[0]);
        
    } catch (error) {
        console.log(error),
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (!user.rows.length || !await bcrypt.compare(password, user.rows[0].password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.rows[0].id }, 'your_jwt_secret');
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
};
