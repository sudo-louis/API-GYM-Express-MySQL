const Pedido = require("../models/Pedido");

exports.createPedido = (req, res) => {
    const { producto_id, cantidad } = req.body;
    const cliente_id = req.cliente.id; // Obtenemos el ID del cliente autenticado

    Pedido.create(cliente_id, producto_id, cantidad, (err, result) => {
        if (err) return res.status(500).json({ error: "Error al crear el pedido" });

        res.status(201).json({ message: "Pedido creado exitosamente", pedido_id: result.insertId });
    });
};

exports.getPedidosByCliente = (req, res) => {
    const cliente_id = req.cliente.id;

    Pedido.findByCliente(cliente_id, (err, pedidos) => {
        if (err) return res.status(500).json({ error: "Error al obtener los pedidos" });

        res.json(pedidos);
    });
};

exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { estatus } = req.body;

    Pedido.updateStatus(id, estatus, (err, result) => {
        if (err) return res.status(500).json({ error: "Error al actualizar el estado del pedido" });

        res.json({ message: "Estado del pedido actualizado" });
    });
};

exports.deletePedido = (req, res) => {
    const { id } = req.params;

    Pedido.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el pedido" });

        res.json({ message: "Pedido eliminado" });
    });
};

exports.cancelPedido = (req, res) => {
    const { id } = req.params;

    Pedido.updateStatus(id, "cancelado", (err, result) => {
        if (err) return res.status(500).json({ error: "Error al actualizar el pedido a cancelado" });

        Pedido.cancelPedido(id, (err, result) => {
            if (err) return res.status(500).json({ error: "Error al registrar la cancelación" });

            res.json({ message: "Pedido cancelado correctamente y registrado en productos_pedido" });
        });
    });
};