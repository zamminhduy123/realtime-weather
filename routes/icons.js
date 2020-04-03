"use strict";
const express = require('express');
let router = express.Router();

const dir = 'D:/Coder/WEB/location-weather/src/icons';

router.get('/*',(req,res) => {
    res.sendFile(dir + req.path);
})


module.exports = router;