const Report = require('../models/report');

module.exports = function (app) {
    // GET reports list
    app.get('/fund/traders/traderId/reports', (req, res) => {
        res.render('reports')
    });

    // GET one report
    app.get('/fund/traders/traderId/reports/reportId', (req, res) => {
        res.render('one-report')
    });
}