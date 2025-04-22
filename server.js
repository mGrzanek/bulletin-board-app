const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const path = require('path');
const adsRouter = require('./routes/ads.routes');
const authRouter = require('./routes/auth.routes');
const app = express();

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use(helmet());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({ secret: process.env.SESSION_SECRET, store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));

app.use('/api', adsRouter);
app.use('/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});