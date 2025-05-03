const express = require('express');
const usuariosController = require('./controllers/usuarios.controller');
const productosController = require('./controllers/productos.controller');
const router = express.Router();

// Rutas para usuarios
router.get('/usuarios', usuariosController.findAll);
router.get('/usuarios/:id', usuariosController.findOne);
router.post('/usuarios', usuariosController.create);
router.put('/usuarios/:id', usuariosController.update);
router.delete('/usuarios/:id', usuariosController.delete);

// Rutas para productos
router.get('/productos', productosController.findAll);
router.get('/productos/:id', productosController.findOne);
router.post('/productos', productosController.create);
router.put('/productos/:id', productosController.update);
router.delete('/productos/:id', productosController.delete);

module.exports = router;