const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/authors', require('./routes/authors'));
app.use('/api/v1/books', require('./routes/books'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
