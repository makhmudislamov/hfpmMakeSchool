const User = require('../models/user');

module.exports = function (app) {

    // GET sign-up form
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });

    // CREATE a user
    app.post("/sign-up", (req, res) => {
        // Create User
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};