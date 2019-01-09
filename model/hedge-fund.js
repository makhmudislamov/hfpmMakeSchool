const mongoose = require('mongoose');

// Model for hedge fund
module.exports = mongoose.model('HedgeFund', {
    fundName: String,
    worth: Number,
    portfolioContent: Number,
    portfolioItems: []
});