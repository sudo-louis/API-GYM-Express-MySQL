const db = require("../config/db");

const Pedido = {
    create: (cliente_id, producto_id, cantidad, callback) => {
        db.query(
            "INSERT INTO pedidos (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)",
            [cliente_id, producto_id, cantidad],
            callback
        );
    },

    findByCliente: (cliente_id, callback) => {
        db.query("SELECT * FROM pedidos WHERE cliente_id = ?", [cliente_id], callback);
    },

    findById: (id, callback) => {
        db.query("SELECT * FROM pedidos WHERE id = ?", [id], callback);
    },

    updateStatus: (id, estatus, callback) => {
        db.query("UPDATE pedidos SET estatus = ? WHERE id = ?", [estatus, id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM pedidos WHERE id = ?", [id], callback);
    },

    cancelPedido: (pedido_id, callback) => {
        db.query(
            "INSERT INTO productos_pedido (pedido_id) VALUES (?)",
            [pedido_id],
            callback
        );
    }
};

module.exports = Pedido;