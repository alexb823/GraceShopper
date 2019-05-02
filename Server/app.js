const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')

// Body parsing middleware
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: false,
}))

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'dist', 'main.js')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

module.exports = app;
