const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const librosRoutes = require('./routes');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const cors = require('cors'); // Import the cors middleware

const app = express();

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutos
    max: 1000, // 1000 solicitudes
    message: 'Has excedido el número de solicitudes permitidas. Por favor intenta más tarde.'
});

// Configurar Express para servir archivos estáticos
app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', limiter);

// Rutas
app.use('/api', librosRoutes);

// Manejador de rutas para manejar rutas no definidas
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});