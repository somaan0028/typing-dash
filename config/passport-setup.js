const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const StackExchangeStrategy = require('passport-stack-exchange');
const RedditStrategy = require('passport-reddit').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require ('bcrypt');

const keys = require('./keys');
const User = require('../models/user-model');

//this function below fired when done() is called after user has been successfully obtained. This gets the data ready for storing in the cookie
passport.serializeUser((user, done) => {
    // we decide that we want to use the user.id as the identification to send into the cookie
    done(null, user.id); //sends the user.id in the cookie

    // After the done() is called above and the cookies are set using the app.use(cookieSession({....) in the app.js file, the next code that runs is the one in the app.get('/google/redirect', ...) in the auth-routes.js file
    // which redirects the user to '/dashboard'. This code didn't run before as passport middleware was at work.
});

// this function comes into play when the user makes a request to a page and send along a cookie. This takes in the id from that cookie
// and finds the user associated with that id and attaches it with the request object which we can use in route handlers.
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


//===============Strategy for Google =================
passport.use(
    new GoogleStrategy({
        // options for google strategy. Get them from Google API dashboard
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {  
        
    // this callback function is fired after control is handed to passport the second time i.e. when passport uses 
    // the already received code to get the entire user profile from google's servers. Then this function
    // is fired. The obtained user profile is passed as the parameter. The id of the obtained profile is checked
    // against the users in the database and if not matches, it creates a new user and if it does, it gets that particular
    // users data and calls the done(null, newUser) function.

    //console.log(profile);

        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // if already have this user
                //console.log('user is: ', currentUser);
                // this done() used below then fires the serializeUser function written above. It passed
                // the current User as a parameter. Same done() is used below as well when new user created and obtained back from the database
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    scores: [],
                    timeOftest: [],
                    realWorldTime: [],
                    personalBest: 0,
                    
                }).save().then((newUser) => {
                    //console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);




//===============Strategy for Github =================
passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/redirect"
  }, (accessToken, refreshToken, profile, done) => {

    //console.log("Got the date from Github!!");
    //console.log(profile);

    User.findOne({githubId: profile.id}).then((currentUser) => {
        if(currentUser){
            // if already have this user
            //console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                githubId: profile.id,
                username: profile.displayName,
                scores: [],
                timeOftest: [],
                realWorldTime: [],
                personalBest: 0,
            }).save().then((newUser) => {
                //console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));




//===============Strategy for StackExchange =================
//Note: You also have to provide the 'stackAppsKey' and 'site' values
passport.use(new StackExchangeStrategy({
    clientID: keys.stackexchange.clientID,
    clientSecret: keys.stackexchange.clientSecret,
    callbackURL: '/auth/stack-exchange/redirect',
    stackAppsKey: keys.stackexchange.appkey,
    site: 'stackoverflow'
  },(accessToken, refreshToken, profile, done) => {


    //console.log("Got the Profile!!");
    //console.log(profile);

    User.findOne({stackexchangeId: profile.id}).then((currentUser) => {
        if(currentUser){
            // if already have this user
            //console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                stackexchangeId: profile.id,
                username: profile.displayName,
                scores: [],
                timeOftest: [],
                realWorldTime: [],
                personalBest: 0,
            }).save().then((newUser) => {
                //console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));




//===============Strategy for Reddit =================
//Notes: Go to reddit.com/prefs/apps to create an app
//Instead of 'displayName', reddit uses just 'name'
//You also have to pass a 'state' parameter which has been done in the routes file
passport.use(new RedditStrategy({
    clientID: keys.reddit.clientID,
    clientSecret: keys.reddit.clientSecret,
    callbackURL: "/auth/reddit/redirect"
  }, (accessToken, refreshToken, profile, done) => {

    //console.log("Got the data from Reddit!!");
    //console.log(profile);

    User.findOne({redditId: profile.id}).then((currentUser) => {
        if(currentUser){
            // if already have this user
            //console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                redditId: profile.id,
                username: profile.name,
                scores: [],
                timeOftest: [],
                realWorldTime: [],
                personalBest: 0,
            }).save().then((newUser) => {
                //console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));

//  use 5fd46ee155500d3f08086a6e for demo id
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    }, function(username, password, done) {

        // this condition will only be true if user clicked on DEMO USER button. 
        if (username == "ros3PkBesnDRT7Q9JhYgYP0MFRCeUl") {

            // finds the demo user from the data base and opens it for the user
            User.findOne({_id: "5fd46ee155500d3f08086a6e" }).then((currentUser) => {
                console.log("THIS IS THE DUMMY USER");
                // console.log(currentUser);
    
                done(null, currentUser);
            });
        }else{
            // This is for the normal login process
            console.log("Now we can query the database!!");
            // console.log(username, password);

            // The user with the particular email is found and the password obtained from the DB is compared
            // with the one entered by the user.
            User.findOne({email: username }).then((currentUser) => {

                bcrypt.compare(password, currentUser.password, function(err, result) {
                    // returns true if password entered matches hashed password in db
                    console.log("Inside comparing hash function");
                    if(result){
                        // password matched
                        console.log("This is the correct User!!!");
                        done(null, currentUser);
                    }else{
                        // If password does not match
                        console.log("Incorrect Password");
                        return done(null, false, {message: "*Incorrect Password"})
                    }
                });
                console.log("Below brypt compare");
                // // password matched
                // if (currentUser.password == password) {
                //     console.log("This is the correct User!!!");
                //     done(null, currentUser);
                // }else{
                //     // If password does not match
                //     console.log("Incorrect Password");
                //     return done(null, false, {message: "*Incorrect Password"})
                // }
            }).catch((err) => {
                // Wrong email entered as no user with that email found
                return done(null, false, {message: "*There is no account with this Email."})
            });
        }
    }
));
