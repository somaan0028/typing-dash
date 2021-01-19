const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const keys = require('./config/keys');
var flash = require('connect-flash');

const app = express();

// set view engine
app.set('view engine', 'ejs');

//for static files
app.use(express.static('public'));
app.use('/auth', express.static('public'));

app.use(express.urlencoded({ extended: true })); //for parsing post requests
app.use(bodyParser.json());  //to parse the data coming in from the fetch POST request

// flash messages
app.use(flash());

// sets up session cookies. This is used when done(null, user.id) is called in the serializeUser function in passport-setup.js.
// This encrypts the user.id and sends them as cookies. 
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,  //time till cookie lives.
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb');
});
//to avoid deprecation warnings
mongoose.set('useFindAndModify', false);


//so we can use the user model
const User = require('./models/user-model');


// set up routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.get('/test', (req, res) => {
    res.render('theTest', { user: req.user });
});


app.post('/savedata', (req, res)=>{

    //save to db
    User.findOne({_id: req.user._id}).then((queriedUser)=>{
        var scoresArray = queriedUser.scores;
        scoresArray.push(req.body.result.net_words_per_min);

        var unixTimeArray = queriedUser.timeOftest;
        unixTimeArray.push(req.body.result.unixTime);

        var realTimeArray = queriedUser.realWorldTime;
        realTimeArray.push(req.body.result.realTime);

        var newPersBest = queriedUser.personalBest;
        var recordBroken = false;
        if (req.body.result.net_words_per_min > queriedUser.personalBest) {
            newPersBest = req.body.result.net_words_per_min;
            recordBroken = true;
        }

        User.findOneAndUpdate({_id: req.user._id},{scores: scoresArray, timeOftest: unixTimeArray, realWorldTime: realTimeArray, personalBest: newPersBest}).then(()=>{
            //console.log("user should have been updated!!");
            User.findOne({_id: req.user._id}).then((updatedUser)=>{
                res.json({
                    net_words_pm: updatedUser.scores[updatedUser.scores.length-1],
                    recordBroken: recordBroken,
                });
            })
            
        })
    })
    .catch(err => console.log(err));

    
});


app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
