const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, 'data/images')));
app.use(routes);

const server = app.listen(PORT, () => {
  console.log(`Hippiex Store API running on port ${PORT}`);
});

module.exports = server;
