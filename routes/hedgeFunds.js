const HedgeFund = require('../models/hedgeFund.js');

module.exports = function (app) {

    // GET dashboard
    // TODO: fix this route to fund, this is not used
    app.get('/myfund', (req, res) => {
        HedgeFund.find()
            .then(hedgeFund => {
                res.render('dashboard', { hedgeFund: hedgeFund });
            })
            .catch(err => {
                console.log(err);
            })
    });

    // GET sign up page
    app.get('/new-fund', (req, res) => {
        res.render('new-fund-form', {});
    });

    // POST created new hedge fund
    app.post('/fund', (req, res) => {
        HedgeFund.create(req.body).then((hedgeFund) => {
            console.log(hedgeFund);
            // res.redirect(`/fund/${hedgeFund._id}`);
            res.redirect('/myfund');
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // GET
    // app.get('/fund', (req, res) => {
    //     HedgeFund.find()
    //         .then(hedgeFund => {
    //             res.render('dashboard', { hedgeFund: hedgeFund });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // })
    
}


