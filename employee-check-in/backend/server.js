const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Разрешаем запросы из других источников

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
    key TEXT,
    time TEXT
  )
`);

// Обработка POST-запроса на сканирование
app.post('/scan', (req, res) => {
  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ error: 'Key is required' });
  }

  const time = new Date().toISOString();

  db.run(
    `INSERT INTO attendance (key, time) VALUES (?, ?)`,
    [key, time],
    function (err) {
      if (err) {
        console.error('Error inserting scan data:', err.message);
        return res.status(500).json({ error: 'Failed to record scan' });
      }
      res.json({ message: 'Scan recorded successfully', id: this.lastID });
    }
  );
});

// Эндпоинт для проверки записей
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
