const express = require("express");
const router = express.Router();

const validation = require("../validation/user");
const user = require("../models/user");


router.post("/login", async (req, res) => {
    if(req.session.username){
        return res.send("User already logged in");
    }

    var userLogin = {
        username: req.body.username,
        password: req.body.password
    }

    const userLoggedIn = await user.login(userLogin);
    if(userLoggedIn){
        req.session.username = userLogin.username;
        req.session.customer_id = await user.getCustomerId(userLogin);
        return res.send("User successfully logged in");
    }

    return res.send("Username or password Incorrect");
})


router.post("/signup", async (req, res) => {
    if(req.session.username){
        return res.send("User already logged in");
    }

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

    // creates the account 
    // if function returns true it has made the account successfully
    if(user.createUser(newUser)){
        console.log("New user has been created: " + newUser.username);
        // add the username to session
        req.session.username = newUser.username
        req.session.customer_id = await user.getCustomerId(newUser.username);
        return res.send("Account created!")
    }
    return res.send("account creation failed")
})


router.post("/create/loan", async (req, res) => {
    if(!req.session.username){
        return res.send("User needs to be logged in")
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        amount: req.body.amount,
        date: new Date()
    };

    





})


router.post("/pay/loan", async (req, res) => {
    if(!req.session.username){
        return res.send("User needs to be logged in")
    }

    var userLogged = {
        username: req.session.username
    }



})
module.exports = router