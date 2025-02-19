const express = require("express");
const router = express.Router();
const clienteAuthController = require("../controllers/clienteAuthController");

router.post("/register", clienteAuthController.register);
router.post("/login", clienteAuthController.login);
router.get("/logout", clienteAuthController.logout);

module.exports = router;