const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Model for hedge fund
module.exports = mongoose.model('HedgeFund', {
    fundName: String,
    worth: String,
    portfolioContent: String,
    portfolioItems: String,
    tradersNum: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});