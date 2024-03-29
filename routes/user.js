const express = require("express");
const router = express.Router();

const validation = require("../validation/user");
const user = require("../models/user");


router.post("/login", async (req, res) => {
    // if the user already has session cookies they are already logged in
    if(req.session.username){
        return res.send("User already logged in");
    }

    // this is the  data sent from the client
    var userLogin = {
        username: req.body.username,
        password: req.body.password
    }

    console.log(userLogin)

    // here i have created a function to validate the input
    const validate = validation.login(userLogin);
    // if there is an error the data that is incorrect is sent back to the client
    if(validate){
        return res.send(validate);
    }


    const userLoggedIn = await user.login(userLogin);
    if(userLoggedIn){
        // setting the user's session cookies
        req.session.username = userLogin.username;
        req.session.customer_id = await user.getCustomerId(userLogin);

        // checking if the user is an admin and then adding to cookies if they are
        const isAdmin = await user.isAdmin(userLogin);
        if(isAdmin){
            // setting that the user is an admin
            // this is what is checked to allow them onto specific pages
            req.session.admin = true;
            // printed in console when an admin logs in
            console.log("Admin has logged in - " + userLogin.username)
            return res.send("logged in")
        }
        
        // printed in console when a customer logs in
        console.log("User has logged in - " + userLogin.username)
        return res.send("user logged in");
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

    // hashing the password before it is inserted into the database 
    newUser.password = user.hashPassword(newUser.password);

    // creates the account 
    // if function returns true it has made the account successfully
    if(user.createUser(newUser)){
        console.log("New user has been created: " + newUser.username);
        // add the username to session
        req.session.username = newUser.username
        req.session.customer_id = await user.getCustomerId(newUser);
        
        return res.send("Account created!")
    }
    return res.send("account creation failed")
})

router.post("/admin/register", async (req, res) => {
    if(!req.session.admin){
        return res.status(403).send("You shouldnt be here!");
    }

    var adminUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob
    };
    
    // this checks to ensure that all inputs are valid for the database
    const validateAdmin = validation.signup(adminUser);
    if(validateAdmin){
        return res.send(validateAdmin)
    }

    // makes a query to check to see if there is already a user with the same username in the database
    const AdminUserExists = await user.checkIfUserExists(adminUser);
    if(AdminUserExists) return res.send("Username is taken");

    // makes a query to check to see if there is already a user with the same email in the database
    const AdminEmailExists = await user.checkIfEmailExists(adminUser);
    if(AdminEmailExists) return res.send("Email is already in use");

    adminUser.password = user.hashPassword(adminUser.password);

    // creates the account 
    // if function returns true it has made the account successfully
    if(user.createAdmin(adminUser)){
        console.log("New admin user has been created: " + adminUser.username);

        return res.send("Admin Account created!")
    }
});


module.exports = router