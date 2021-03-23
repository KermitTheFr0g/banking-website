const express = require("express");
const router = express.Router();
const db = require("../database");

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


router.post("/signup", (req, res) => {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob
    };

    //const error = validation.signupValidation(newUser);
    //if(error){
    //    return res.statuscode(400).send(error)
    //}

    

    res.send("nice bro")
})

module.exports = router