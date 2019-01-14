const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Trader = mongoose.model('Trader', {
    name: String,
    allocated: String,
    currentWorth: String,
    portfolioContent: String,
    portfolioItems: String,
    hedgeFundId: { type: Schema.Types.ObjectId, ref: 'HedgeFund' }
});

module.exports = Trader