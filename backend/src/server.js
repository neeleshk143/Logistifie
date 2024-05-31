const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const healthRoutes = require('./routes/healthRoutes');
const createTables = require('./dbInit');

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;

createTables()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        process.exit(1); // Exit process with failure code
    });
