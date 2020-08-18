const express = require('express');
const router = express.Router();
const fs = require('fs');
fs.readdirSync(__dirname).map(file=>{
    console.log('file',file)
    if(file == 'index.js'){
        return false
    }
    require(`./${file}`)(router)
})
module.exports = router;