const ProductoModel = require("../models/producto.model");

// Obtiene todos los productos de la base de datos
exports.findAll = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido un error mientras se intentaba obtener los productos."
            });
        else res.send(data);
    });
};

// Busca un producto por su id
exports.findOne = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró producto con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener el producto con id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Crear y guardar un nuevo producto
exports.create = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío",
        });
    }

    // Crear un producto
    const producto = new ProductoModel({
        id: 0,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        preciodecosto: req.body.preciodecosto,
        preciodeventa: req.body.preciodeventa,
        cantidad: req.body.cantidad,
        fotografia: req.body.fotografia,
    });

    // Guarda el producto en la base de datos
    ProductoModel.create(producto, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mientras se intentaba crear el producto.",
            });
        } else res.send(data);
    });
};

// Actualiza un producto identificado por el id en la solicitud
exports.update = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío",
        });
    }

    ProductoModel.updateById(req.params.id, new ProductoModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró producto con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error mientras se actualizaba producto con id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Se elimina un producto con el id especificado en la solicitud
exports.delete = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró producto con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar producto con id " + req.params.id,
                });
            }
        } else res.send({ message: "El producto fue eliminado exitosamente!" });
    });
};