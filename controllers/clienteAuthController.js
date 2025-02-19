const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");
require("dotenv").config();

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    Cliente.findByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ error: "Error en el servidor" });

            Cliente.create(username, email, hashedPassword, (err, result) => {
                if (err) return res.status(500).json({ error: "Error al registrar cliente" });

                res.status(201).json({ message: "Cliente registrado exitosamente" });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    Cliente.findByEmail(email, (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "Cliente no encontrado" });

        const cliente = results[0];

        bcrypt.compare(password, cliente.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

            const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ message: "Login exitoso", token });
        });
    });
};

exports.logout = (req, res) => {
    res.json({ message: "Logout exitoso, token invalidado en el cliente" });
};