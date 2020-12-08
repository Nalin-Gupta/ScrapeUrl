const express  = require('express');
const passport = require('passport');
const {ensureAuth , ensureGuest} = require('../helper/auth');


//var
// let address = 'https://en.wikipedia.org/wiki/HMS_Seraph_(P219)';
//Puppet
const scrape = require('../helper/scrapper');

// let ans =  scrape(address);
// console.log(ans);

//importing the created models
const User = require('../models/User');
const Url = require('../models/Url');
const router = express.Router();


//Landing Page - Login
router.get('/' , ensureGuest , (req , res) => {
    res.render('login');
})

//Login Post
router.post('/' , ensureGuest , passport.authenticate('local' , {
    successRedirect: '/main',
    failureRedirect: '/',
    failureFlash : true
}) )
//Register Page
router.get('/register' , ensureGuest ,  (req , res) => {
    res.render('register');
})


//Post Register - Submitting new user details
router.post('/register' ,ensureGuest ,  async (req , res) => {
    // console.log(req.body);
    // res.send('hello');
    const name = req.body.name;
    const password = req.body.password;
    const password2 = req.body.password2;

    //Perform server side form validation
    let errors = [];

    if(!name || !password || !password2){
        errors.push({ msg: 'All Fields need to be filled'});
    }

    if(password !== password2){
        errors.push({msg : 'Passwords do not match'})
    }

    if(password.length < 8){
        errors.push({msg : 'Password should be of minimum 8 characters'})
    }


    //

    if(errors.length !== 0){
        //There was an error
        res.render('register' , {
            errors
        });
    }
    else{
        //Successful Validation - 
        try {
            let user = await User.findOne({ name: name});
            if(user){
                //user exists
                errors.push({msg : 'User already exists'});
                res.render('register' , {
                    errors
                });

            } else {
                const user = new User({
                    name, 
                    password
                });

                const newUser =  await user.save();
                res.redirect('/');
            }

        }catch(err){
            console.log(err);
            res.redirect('/');
        }
    }
})


//Route to load the landing page one a user loggs in 
router.get('/main' , ensureAuth , (req , res)=> {
    res.render('main');
})


//Route to post URL data and display the URL contents 
router.post('/main' , ensureAuth , async (req , res) => {
    const address = req.body.address;
    let errors = [];

    try{
        let url = await Url.findOne({address : address});
        if(url){
            //Already Exists
            let data = url.data;
            if(data.length === 0){
                // console.log('hit');
                errors.push({msg : `Data could not be scrapped from ${address}`})
                errors.push({msg : 'Please enter another URL '})
            }
             res.render('main' , {
                data,
                errors
            });
        }else{
                try{
                    const data = await scrape(address);

                    //Saving to DB
                    const url = new Url({
                            address,
                            data
                    });
                    

                    if(data.length === 0){
                        // console.log('hit');
                        errors.push({msg : `Data could not be scrapped from ${address}`})
                        errors.push({msg : 'Please enter another URL '})
                    }

                    if(errors.length === 0){
                        const newUrl = await url.save();
                    }

                    res.render('main', {
                        data,
                        errors,
                    });
                }catch(err){
                    errors.push({msg : 'The URL entered is not valid'})
                    res.render('main', {
                        errors,
                    });
                }
                //check if there was an error while scrapping
                // console.log(data.length);
        }

    }catch(err){
        console.log(err);
        }
})


//Route to logout
router.delete('/logout' , ensureAuth , (req , res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;