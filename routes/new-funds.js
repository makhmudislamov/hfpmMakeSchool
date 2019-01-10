const express = require('express');
const router = express.Router();
const HedgeFund = require('../models/hedge-fund.js');

// GET sign up page
router.get('/', function (req, res, next) {
    res.render('new-fund-form');
});

module.exports = router;