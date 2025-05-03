const sql = require("./db.js");

// constructor
const Producto = function (producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.preciodecosto = producto.preciodecosto;
    this.preciodeventa = producto.preciodeventa;
    this.cantidad = producto.cantidad;
    this.fotografia = producto.fotografia;
};

Producto.getAll = (result) => {
    let query = "SELECT * FROM productos";

    sql.query(query, function (err, results, fields) {
        if (err) {
            result(err, null);
            return;
        }

        result(null, results);
    });
};

Producto.findById = (id, result) => {
    sql.query(`SELECT * FROM productos WHERE id = '${id}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Producto no encontrado
        result({ kind: "not_found" }, null);
    });
};

Producto.create = (newProducto, result) => {
    sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        newProducto.id = res.insertId;
        result(null, { ...newProducto });
    });
};

Producto.updateById = (id, producto, result) => {
    sql.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, preciodecosto = ?, preciodeventa = ?, cantidad = ?, fotografia = ? WHERE id = ?",
        [producto.nombre, producto.descripcion, producto.preciodecosto, producto.preciodeventa, producto.cantidad, producto.fotografia, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // No se encontró producto con id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...producto });
        }
    );
};

Producto.remove = (id, result) => {
    sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Producto no encontrado
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Producto;