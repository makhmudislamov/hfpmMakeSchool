const mongoose = require('mongoose');

// Model for hedge fund
module.exports = mongoose.model('HedgeFund', {
    fundName: String,
    worth: String,
    portfolioContent: String,
    portfolioItems: String,
    traders: String  // 
    // add user here
});