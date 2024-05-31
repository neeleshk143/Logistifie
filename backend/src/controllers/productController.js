const pool = require('../db');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, req.user.userId]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products WHERE created_by = $1', [req.user.userId]);
        res.json(products.rows);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const updatedProduct = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND created_by = $5 RETURNING *',
            [name, description, price, id, req.user.userId]
        );
        if (!updatedProduct.rows.length) {
            return res.status(404).send('Product not found');
        }
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await pool.query(
            'DELETE FROM products WHERE id = $1 AND created_by = $2 RETURNING *',
            [id, req.user.userId]
        );
        if (!deletedProduct.rows.length) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted');
    } catch (error) {
        res.status(400).send(error);
    }
};
