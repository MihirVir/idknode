const passport = require('passport');
const User = require('../models/user');
const  LocalStrategy = require('passport-local').Strategy;

// authentication using passport 
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done) {
        //find a user and establish identity
        User.findOne({email: email}, function(err, user) {
            if(err) {
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password) {
                req.flash('error', 'Invalid username or password ');
                return done(null, false);
            }
            return done(null, user);
        })
    }
))
//it stores cookies in ecrypted format
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    //finding user by cookie id and have a callback function 
    //which takes err and user as the params
    User.findById(id, function(err, user){
        if(err) {
            console.log('error occured -> passport');
            return done(err);
        }
        return done(null, user);
    })
});


passport.checkAuthentication = function(req, res, next) {
    //if the user is signed in, then pass on the request to the next fucntion
    if(req.user) {
        return next();
    }
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.user) {
        //req.user contains the current signed in user from seesion cookie and we are just sending this to the locals for the idk
        res.locals.user = req.user;
    }
    next();
    // return res.redirect('/users/sign-in');
}

module.exports = passport;