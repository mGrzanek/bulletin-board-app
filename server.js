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
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
  

    app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    store: MongoStore.create({
      //mongoose.connection,
      mongoUrl: process.env.MONGODB_URI,
    }), 
    name: 'session_id', 
    resave: false, 
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    }
  }));

  app.use(helmet());
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  }, express.static(path.join(__dirname, '/public/uploads')));

  app.use(express.static(path.join(__dirname, '/client/build')));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  app.use('/api', adsRouter);
  app.use('/auth', authRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

  app.use((req, res) => {
      res.status(404).json({ message: 'Not found...' });
  });

  app.listen(process.env.PORT || 8000, () => {
      console.log('Server is running...');
  });
});

db.on('error', err => console.log('Error ' + err));