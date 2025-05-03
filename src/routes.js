const express = require('express');
const usuariosController = require('./controllers/usuarios.controller');
const router = express.Router();

// Rutas
router.get('/usuarios', usuariosController.findAll);
router.get('/usuarios/:id', usuariosController.findOne);
router.post('/usuarios', usuariosController.create);
router.put('/usuarios/:id', usuariosController.update);
router.delete('/usuarios/:id', usuariosController.delete);

module.exports = router;