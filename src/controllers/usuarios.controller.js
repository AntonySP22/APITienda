const UsuarioModel = require("../models/usuario.model");

// Obtiene todos los usuarios de la base de datos
exports.findAll = (req, res) => {
    UsuarioModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido un error mientras se intentaba obtener los usuarios."
            });
        else res.send(data);
    });
};

// Busca un usuario por su id
exports.findOne = (req, res) => {
    UsuarioModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro usuario con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener el usuario con id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío",
        });
    }

    // Crear un usuario
    const usuario = new UsuarioModel({
        id: 0,
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
    });

    // Guarda el cliente en la base de datos
    UsuarioModel.create(usuario, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mientras se intentaba crear el usuario.",
            });
        } else res.send(data);
    });
};

// Actualiza un usuario identificado por el id en la solicitud
exports.update = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío",
        });
    }

    UsuarioModel.updateById(req.params.id, new UsuarioModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró usuario con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error mientras se actualizaba usuario con id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Se elimina un usuario con el id especificado en la solicitud
exports.delete = (req, res) => {
    UsuarioModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró usuario con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar usuario con id " + req.params.id,
                });
            }
        } else res.send({ message: "El usuario fue eliminado exitosamente!" });
    });
};