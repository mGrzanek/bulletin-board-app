const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});

mongoose.connect('mongodb://127.0.0.1:27017/bulletinBoardDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});