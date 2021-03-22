const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const format = require("string-template");
const validation = require("../validation/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "banking_website"
});

db.connect(function(error) {
    if(error){
        throw error;
    }
})

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

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                throw err;
            }
            var hashedPassword = hash;
        });
    });

    var sql = format('INSERT INTO customer (username, email, password, first_name, last_name, dob)' +
        'VALUES  ("{username}", "{email}", "{password}", "{firstName}", "{lastName}", "{dob}");', {
            username: username,
            email: email,
            password: password,
            firstName: first_name,
            lastName: last_name,
            dob: dob
        }
    )

    db.query(sql , function(err, results){
        if(err){
            throw err;
       }
    })
    

    console.log("New user has signed up:" + username);
    res.send("you have signed up");
})

module.exports = router