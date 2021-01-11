const router = require('express').Router();
const passport = require('passport');
const bcrypt = require ('bcrypt');
const User = require('../models/user-model');
var flash = require('connect-flash');

// auth login
router.get('/login', (req, res) => {
    // req.flash().error is the msg that exists when wrong email or password is entered.
    // Stores whatever is in the flash msg in the variable errorMsg
    // console.log(req.flash().error[0]);
    var errorMsg = req.flash();

    // if errorMsg is not an empty object, get the msg and store in the errorMsg variable itself
    if (Object.keys(errorMsg).length > 0) {
        console.log("There is something");
        var msg = errorMsg.error[0];
        console.log(msg);
        errorMsg = msg;
    }else{

        // if errorMsg is an empty object, it means no flash msg present, therefore errorMsg set to null
        errorMsg = null;
    }

    res.render('login', { user: req.user, errorMsg: errorMsg});  //if user is logged in, passport will give us access to req.user.
    //we can send this req.user (if present) to the view to do things in the view which depend upon whether the user is logged in or not
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();    //removes the cookie from the browser
    res.redirect('/');
});

router.get('/register', (req, res) => {
    // stores whatever is in the flash msg in the variable errorMsg
    var errorMsg = req.flash();

    // if errorMsg is not an empty object, get the msg and store in the errorMsg variable itself
    if (Object.keys(errorMsg).length > 0) {
        var msg = errorMsg.error[0];
        console.log(msg);
        errorMsg = msg;
    }else{

        // if errorMsg is an empty object, it means no flash msg present, therefor errorMsg set to null
        errorMsg = null;
    }
    res.render('register', { user: req.user, errorMsg: errorMsg });
});

// auth with google+
// now passport takes over and communicated with google to get the profile of the user. 
// However it will not get the progile in the first time. It will only get a code from google 
// and just redirect to '/google/redirect' which we have handled below
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Note that passport will use the strategy in the passport-setup.js file to communicate with google servers.
// Those strategies also have a call back function but it will not be fired once the code is retrieved. It will only be fired
// if we ask passport again to use the code to get the profile of the user.

// This is the callback route for google to redirect to with a special code related to the user.
// We again give control to passport. Passport retrieves the user's profile from google and then goes back to the passport-setup.js file 
// and fires the callback function inside the strategy which was not called before. That function then checks whether that user is present in
// hands control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

    res.redirect('/dashboard');
});



// auth with github
router.get('/github', passport.authenticate('github', {
    scope: [ 'user:email' ]
}));

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {

    res.redirect('/dashboard');
});


//auth with stack exchange
router.get('/stack-exchange', passport.authenticate('stack-exchange'));

router.get('/stack-exchange/redirect', passport.authenticate('stack-exchange', { failureRedirect: '/login' }), (req, res) => {
    
    res.redirect('/dashboard');
});


//auth with reddit
router.get('/reddit', passport.authenticate('reddit', {
    state: "dummystring",
}));

router.get('/reddit/redirect', passport.authenticate('reddit', { failureRedirect: '/login' }), (req, res) => {
    
    res.redirect('/dashboard');
});

// This is for the users creating a new account
router.post('/register', (req, res, next) => {
    User.findOne({email: req.body.email}).then((currentUser) => {
        
        if(currentUser){
            // If there is already an account with the entered email
            req.flash('error', '*There is already an account with this email');
            res.redirect('/auth/register');

        } else {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                // returns hash
                console.log(hash);
                // If the email is new, create a new account in the DB
                new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    scores: [],
                    timeOftest: [],
                    realWorldTime: [],
                    personalBest: 0,
                    
                }).save().then((newUser) => {
    
                    // Once new account created, redirect user to login page.
                    console.log('created new user: ', newUser);
                    // res.send("User added to DB");
                    res.redirect(307, '/auth/locallogin');
                });
                });
            });
            
        }
    });
});

router.post("/deletethislater", function(req, res){
    console.log("The post request was successful");
    console.log(req.body);
});

// This is for the users logging in through the normal procedure
router.post('/locallogin', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard', 
        failureRedirect: '/auth/login',
        failureFlash: true, 
    })(req, res, next);    
});

// This is for the users logging in through the DEMO USER button
router.post('/demouser', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard', 
        failureRedirect: '/auth/login',
    })(req, res, next);    
});

module.exports = router;