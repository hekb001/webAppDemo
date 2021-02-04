const express = require('express');
const router = express.Router();
const fs = require('fs');
fs.readdirSync(__dirname).map(file => {
  if(file === 'index.js') return;
  console.log('file: ', file);
  require(`./${file}`)(router);
});

module.exports = router;

