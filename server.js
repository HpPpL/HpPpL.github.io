const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
const mongoDB = 'mongodb+srv://enderloshka:pjR0ZVsYLuidQUcw@clusterweb.i8y8cm1.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
}).catch((error) => {
  console.error('Connection error', error.message);
});

const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  chkAccepted: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


// Middleware для обработки данных формы
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обслуживание статических файлов из корня проекта
app.use(express.static(__dirname));

// Маршруты для статических страниц
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'feedback.html'));
});
app.get('/bot', (req, res) => {
  res.sendFile(path.join(__dirname, 'bot.html'));
});
app.get('/feedback-list', (req, res) => {
  res.sendFile(path.join(__dirname, 'feedback-list.html'));
});


// Маршрут для обработки данных формы
app.post('/submit-feedback', (req, res) => {
  // Преобразование значения 'on' в true и любого другого значения в false
  req.body.chkAccepted = req.body.chkAccepted === 'on';
  
  const newFeedback = new Feedback(req.body);
  newFeedback.save()
    .then(() => res.send('Спасибо за ваш отзыв!'))
    .catch(err => res.status(400).send('Ошибка сохранения данных: ' + err.message));
});


// Маршрут для отображения данных
app.get('/feedbacks', (req, res) => {
  Feedback.find()
    .then(feedbacks => {
      res.json(feedbacks);
    })
    .catch(err => res.status(404).send('Не удалось получить данные: ' + err.message));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
