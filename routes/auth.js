const User = require('../models/user');

module.exports = function (app) {


    // GET log-in form
    app.get('/log-in', (req, res) => {
        res.render('log-in');
    });
    
    // login
    app.post('/log-in', (req, res, next) => {
        if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
                if (error || !user) {
                    var err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/fund');
                }
            });
        } else {
            let err = new Error('All fields required.');
            err.status = 400;
            return next(err); // having error here: next is not defined
        }
    });
    // GET sign-up form
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });

    // CREATE a user
    app.post('/sign-up', (req, res, next) => {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
        }

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }

            User.create(userData, function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/fund');
                }
            });

        } else if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
                if (error || !user) {
                    var err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/fund');
                }
            });
        } else {
            let err = new Error('All fields required.');
            err.status = 400;
            return next(err); // having error here: next is not defined
        }
    });

    // GET route after registering
    app.get('/fund', function (req, res, next) {
        User.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        let err = new Error('Not authorized! Go back!');
                        err.status = 400;
                        return next(err);
                    } else {
                        // made changes here
                        return res.render('dashboard')
                    }
                }
            });
    });

    // GET for logout logout
    app.get('/logout', function (req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    });
};


// used this tutorial: https://github.com/Createdd/authenticationIntro 