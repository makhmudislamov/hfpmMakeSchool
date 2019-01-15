const Trader = require('../models/trader');
const HedgeFund = require('../models/hedgeFund');

module.exports = function (app) {
    // GET form
    app.get('/fund/:id/traders/new-trader', (req, res) => {
        HedgeFund.findById(req.params.id).then(hedgeFund => {
            res.render('new-trader', {hedgeFund})
        })
        
    });

    // CREATE new trader
    app.post('/fund/:id/traders/', (req, res) => {
        Trader.create(req.body).then((trader) => {
            console.log(trader);
            res.redirect(`/fund/:id/traders/${trader._id}`);
            // res.redirect(`/fund/:id/${trader.hedgeFundId}`);
            // res.redirect('fund-show');
        }).catch((err) => {
            console.log(err.message);
        })
    });

     // GET trader list - works
    // app.get('/fund/:id/traders/', (req, res) => {
    //     Trader.findById(req.params.id).then(trader => {
    //         res.render('traders', {traders}) // this works >> can render 'traders'
    //     })   
    // });

    // GET traders list - works but not reading {{hedgeFund._id}}
    app.get('/fund/:id/traders/', (req, res) => {
        Trader.find()
            .then(trader => {
                res.render('traders', { trader: trader });
            })
            .catch(err => {
                console.log(err);
            })
    });

    // app.get('/fund/:id/traders/', (req, res) => {
    //     // find review
    //     HedgeFund.findById(req.params.id).then(hedgeFund => {
    //         // fetch its comments
    //         Trader.find({ hedgeFundId: req.params.id }).then(trader => {
    //             // respond with the template with both values
    //             // res.render('orgs-show', { charity: charity, comments: comments })
    //             res.render('traders', { trader: trader })
    //         })
    //     }).catch((err) => {
    //         // catch errors
    //         console.log(err.message)
    //     });
    // });



    // GET one trader
    app.get('/fund/:id/traders/:id', (req, res) => {
        Trader.findById(req.params.id).then(trader => {
            res.render('trader-show', {trader})
        })
    });

}