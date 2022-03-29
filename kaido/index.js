
const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customeMiddleWare = require('./config/middleware');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

//make the uploads path available to the browser

app.use('/uploads', express.static(__dirname + "/uploads"))

app.use(expressLayouts);
//extratct scripts and styles from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router


//setting up template engine ejs 
app.set('view engine', 'ejs');
app.set('views', './views');

//session cookies
app.use(session({
    name: 'kaido',
    //TODO change the secret before the deployment in production mode
    secret: 'blahsheesh',
    saveUninitialized: false,
    resave: false,
    cookie: {
        //maxage = ms * ns * s
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({mongoUrl: "mongodb://localhost/kaido_dev"})
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customeMiddleWare.setFlash);
app.use('/', require('./routes'));
//firing up the server
app.listen(port, function(err){
    if (err){
        console.log('error aagaya bro', err);
        return;
    }
    console.log(`server is running on port number ${port}`);
})

