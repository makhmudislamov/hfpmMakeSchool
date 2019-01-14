const Trader = require('../models/trader');
const HedgeFund = require('../models/hedgeFund');

module.exports = function (app) {
    // GET trader list
    // app.get('/fund/traders', (req, res) => {
    //     res.render('traders')
    // });

    // GET form
    app.get('/fund/:id/traders/new-trader', (req, res) => {
        HedgeFund.findById(req.params.id).then(hedgeFund => {
            res.render('new-trader', {hedgeFund})
        })
        
    });

    // CREATE new trader
    // add fundID?
    app.post('/fund/:id', (req, res) => {
        Trader.create(req.body).then((trader) => {
            console.log(trader);
            res.redirect(`/fund/traders/${trader._id}`);
            // res.redirect('fund-show');
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // 
    app.get('/fund/traders/:id', (req, res) => {
        res.render('fund-show')
    });
}