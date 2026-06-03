const path = require('path');

const cors = require('cors');
const express = require('express');

const config = require('./config');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

const corsOptions =
  config.corsOrigin === '*'
    ? {}
    : { origin: config.corsOrigin.split(',').map((origin) => origin.trim()) };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, 'data/images')));
app.use(routes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Hippiex Store API running on port ${config.port}`);
});

module.exports = server;
