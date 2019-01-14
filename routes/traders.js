const Trader = require('../models/trader');

module.exports = function (app) {
    // GET trader list
    app.get('/fund/traders', (req, res) => {
        res.render('traders')
    });
}