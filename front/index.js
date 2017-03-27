'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(express.static('dist'));
app.use(express.static('img'));
app.get('/', (req, res) => {
  return res.sendFile(path.resolve('dist/index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
