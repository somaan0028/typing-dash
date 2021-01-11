const router = require('express').Router();
const User = require('../models/user-model');


const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

var previousResults = {};

router.get('/', authCheck, (req, res) => {

    User.findOne({_id: req.user._id}).then((theUser)=>{
        var numOfResultsToPrint = 5;
        if ( theUser.scores.length < numOfResultsToPrint ) {
            numOfResultsToPrint = theUser.scores.length
        }
        //console.log(theUser.length +" is less than "+ numOfResultsToPrint)
        previousResults = {
            scores: theUser.scores,
            times: theUser.realWorldTime,
            unixTimes: theUser.timeOftest,
            numOfResultsToPrint: numOfResultsToPrint,
            persBest: theUser.personalBest,
        };
        //console.log("below is the object of scores and time");
        //console.log(previousResults);
        //console.log(theUser.timeOftest)
        res.render('dashboard', { user: req.user, oldResults: previousResults });
    })
    .catch(err => console.log(err));
    
});

module.exports = router;
