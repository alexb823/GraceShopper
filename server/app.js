const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Logger for development
app.use(require('morgan')('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for API testing in Postman

// Session middleware
app.use(
  session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: false,
  })
);

// Session logging middleware
app.use((req, res, next) => {
  console.log('SESSION: ', req.session)
  next()
})

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.use('/api', require('./routes'));

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Server error!');
});

module.exports = app;
