const express = require('express');
const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const port = 3000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
  res.send('Hello EP4');
});

app.listen(port, () => {
  debug(`Listening on localhost:${port}`);
});
