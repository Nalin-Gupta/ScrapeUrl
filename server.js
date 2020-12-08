// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config();
// }

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const flash =  require('express-flash');
const methodOverride = require('method-override');

//Initialize the app
const app = express();

//Passport config
const initializePassport = require('./config/passport');
initializePassport(passport);


//Load Config
dotenv.config({path: './config/config.env'})

//Import DB function
const connectDB = require('./config/db');
connectDB();


//EJS MiddleWare and Setup
app.use(expressLayouts);
app.set('view engine' , 'ejs');

//Middleware to accept data from form
app.use(express.urlencoded({extended: false}));


//
app.use(flash());

//Express Session set up
app.use(session({
    secret : 'Saarthi',
    resave : true,
    saveUninitialized: true
}));


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set up method override
app.use(methodOverride('_method'));

//Import the Routes 
const indexRouter = require('./routes/index');

//Use the routes
app.use('/' , indexRouter);

//set the port
const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`Server Running on port ${PORT}`));

