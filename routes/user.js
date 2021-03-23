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


router.post("/signup", async (req, res, next) => {
    //const error = validation.signupValidation(req.body)
    //if(error){
    //    return res.statuscode(400).send(error)
    //}
    
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;


    // need to fix this to ensure that multiple responses are sent at once
    var sql = format("SELECT * FROM customer WHERE username = '{username}';", {
        username: username
    });

    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }

        console.log(result);

        if(result.length > 0) {
            return res.send("username in use")
        }
        return false;
    })


    var hashedPassword = await bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                throw err;
            }
            return hash
        });
    });

    var sql = format('INSERT INTO customer (username, email, password, first_name, last_name, dob)' +
        'VALUES  ("{username}", "{email}", "{password}", "{firstName}", "{lastName}", "{dob}");', {
            username: username,
            email: email,
            password: hashedPassword,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            dob: req.body.dob
        }
    )

    db.query(sql , function(err, results){
        if(err){
            throw err;
       }
    })
    
    console.log("New user has signed up: " + username);
    return res.send("you have signed up");
})

module.exports = router