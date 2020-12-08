const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { init } = require('../models/User');

//User model
const User = require('../models/User');

function initialize(passport){

    const authenticateUser =  async (name , password , done) => {
        //check if a user exists
        try{
            let user =   await User.findOne({name : name})
            console.log(user.name);
            console.log(user.password);
        }catch(err){
            console.log(err);
            return done(null , false , {message : 'No user exists with that name'});
        }
     
        //Check if password matches
        let user =   await User.findOne({name : name})
        if(password === user.password){
            return done(null , user);
        }
        else{
            return done(null  , false , {message : 'Password Incorrect'});
        }
    }
    passport.use(new LocalStrategy({usernameField : 'name'} , authenticateUser));

    passport.serializeUser((user , done) => done(null, user.id));
    passport.deserializeUser((id , done) => {
        User.findById(id , (err , user)=> {
            done(err , user);
        });
    });
}
module.exports = initialize;
