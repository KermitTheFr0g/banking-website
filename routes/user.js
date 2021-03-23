const express = require("express");
const router = express.Router();

const validation = require("../validation/user");
const user = require("../models/user");


router.post("/login", (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password
    }

    user.login()

    return res.send("epic it worked");
})


router.post("/signup", async (req, res) => {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob
    };
    
    // this checks to ensure that all inputs are valid for the database
    const validate = validation.signup(newUser);
    if(validate){
        return res.send(validate)
    }

    // makes a query to check to see if there is already a user with the same username in the database
    const userExists = await user.checkIfUserExists(newUser);
    if(userExists) return res.send("Username is taken");

    // makes a query to check to see if there is already a user with the same email in the database
    const emailExists = await user.checkIfEmailExists(newUser);
    if(emailExists) return res.send("Email is already in use");

    newUser.password = user.hashPassword(newUser.password);

    if(user.createUser(newUser)){
        console.log("New user has been created: " + newUser.username);
        return res.send("Account created!")
    }
    return res.send("account creation failed")
})

module.exports = router