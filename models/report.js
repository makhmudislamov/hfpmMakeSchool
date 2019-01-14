const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Report = mongoose.model('Report', {
    title: String,
    content: String,
    traderId: { type: Schema.Types.ObjectId, ref: 'Trader' }
});

module.exports = Report