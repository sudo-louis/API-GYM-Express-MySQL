const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const clienteAuthMiddleware = require("../middleware/clienteAuthMiddleware");

router.post("/", clienteAuthMiddleware, pedidoController.createPedido);
router.get("/", clienteAuthMiddleware, pedidoController.getPedidosByCliente);
router.put("/:id", clienteAuthMiddleware, pedidoController.updateStatus);
router.delete("/:id", clienteAuthMiddleware, pedidoController.deletePedido);
router.post("/:id/cancelar", clienteAuthMiddleware, pedidoController.cancelPedido);

module.exports = router;