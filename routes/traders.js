const Trader = require('../models/trader');

module.exports = function (app) {
    // GET trader list
    app.get('/fund/traders', (req, res) => {
        res.render('traders')
    });

    // GET form
    app.get('/fund/traders/new-trader', (req, res) => {
        res.render('new-trader')
    });

    // CREATE new trader
    // add fundID?
    app.post('/fund/traders', (req, res) => {
        Trader.create(req.body).then((trader) => {
            console.log(trader);
            // res.redirect(`/fund/${trader._id}`);
            res.redirect('traders');
        }).catch((err) => {
            console.log(err.message);
        })
    });

    app.get('/fund/traders/:id', (req, res) => {
        res.render('trader-show')
    });
}