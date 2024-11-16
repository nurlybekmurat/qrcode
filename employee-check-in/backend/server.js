const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Разрешение запросов из других источников

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Создание таблицы, если её нет
db.run(`
  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    time TEXT
  )
`);

// Обработка POST-запроса на check-in
app.post('/check-in', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const time = new Date().toISOString();

  db.run(
    `INSERT INTO attendance (name, time) VALUES (?, ?)`,
    [name, time],
    function (err) {
      if (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({ error: 'Failed to register' });
      }
      res.json({ message: 'Check-in successful', id: this.lastID });
    }
  );
});

// Эндпоинт для просмотра всех записей (только для отладки)
app.get('/records', (req, res) => {
  db.all(`SELECT * FROM attendance`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
