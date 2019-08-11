const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys') //grabs our secret key from keys.js
const validateRegisterInput = require('../../validation/register') // import model validations
const validateLoginInput = require('../../validation/login') // import model validations


// router.get("/test", (req, res) => {
//     res.json({ msg: "This is the users route" })// when path is visited, send a json response alerting the user of the route.
// })


    router.post('/register', (req, res) => { // when this path is entered into url, fire this callback
    
    const {errors, isValid} = validateRegisterInput(req.body) // set errors, isValid to validateRegisterInput which takes in all the fields and checkst their validations
        if (!isValid){
            return res.status(400).json(errors);
        }

    
    
        User.findOne({email: req.body.email})
    .then( user=> {
        if (user){
            return res.status(400).json({email: 'A user is already registered with that email'})
        }else{
            const newUser = new User({ // creates a new user , that utilizes categories imported from User.js model.
                handle: req.body.handle, // verifies the user enters a handle on user creation
                email: req.body.email, // verifies the user enters an email on user creation
                password: req.body.password  // verifies the user enters a password on user creation
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
    
})
    router.post('/login', (req, res) => {
        const {errors, isValid} = validateLoginInput(req.body)

        if (!isValid){
            return res.status(400).json(errors)
        }
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email })// checks db for email that was inputted, eturns a promise
            .then(user => {
                if (!user) { // if we dont find a user, return an error in json format
                    return res.status(404).json({ email: 'User not found' })
                }

                bcrypt.compare(password, user.password) // returns promise
                    .then(isMatch => {
                        if (isMatch) {
                           const payload = {
                               id: user.id,
                               handle: user.handle,
                               email: user.email,
                           }
                           jwt.sign(payload, //whats going on?
                            keys.secretOrKey, 
                            { expiresIn: 3600},
                            (err,token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })

                        } else {
                    return res.status(400).json({ password: 'Password was incorrect' })
                }
            })
        })
    
    })

module.exports = router;