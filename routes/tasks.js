const express = require('express');
const mysql = require('mysql2');
const router = express.Router();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

// Obtener todas las tareas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear una tarea
router.post('/', (req, res) => {
    const { title, completed } = req.body;
    const sql = 'INSERT INTO tasks (title, completed) VALUES (?, ?)';
    db.query(sql, [title, completed], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, completed });
    });
});

module.exports = router;
