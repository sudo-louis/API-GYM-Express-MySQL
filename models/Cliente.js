const db = require("../config/db");

const Cliente = {
    findByEmail: (email, callback) => {
        db.query("SELECT * FROM clientes_login WHERE email = ?", [email], callback);
    },

    create: (username, email, hashedPassword, callback) => {
        db.query(
            "INSERT INTO clientes_login (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            callback
        );
    },
};

module.exports = Cliente;