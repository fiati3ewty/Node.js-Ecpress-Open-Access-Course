const express = require('express');
const app = express();
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const productsRouter = require('./src/router/productsRouter');

const PORT = process.env.PORT || 3001;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.render('index', {
    username: 'Choco',
    customers: ['Kitti', 'Kittikorn', 'Kity'],
  });
});

app.listen(PORT, () => {
  debug(`Listening on localhost:${PORT}`);
});
