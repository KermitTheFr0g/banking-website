const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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
    console.log("connected");
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


    var sql = 'INSERT INTO customer (username, email, password, first_name, last_name, dob)' +
    'VALUES  ("kermit", "kermit@gmail.com", "Password123", "Oli", "Gray", "2002-08-26")';


    /*
    db.query(sql , function(err, results){
        if(err){
            throw err;
       }
        console.log(results);
    })
    */

    console.log(req.body);
    res.send("you have signed up");
})

module.exports = router