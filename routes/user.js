const express = require("express");
const router = express.Router();
const mysql = require("mysql");

router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username + " " + password);

    return res.send("epic it worked");
})

router.post("/signup", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var dob = req.body.dob;


    console.log(req.body)
    res.send("you have signed up bozo");
})

module.exports = router