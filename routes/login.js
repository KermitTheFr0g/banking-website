const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username + " " + password);

    return res.send("epic it worked");
})

module.exports = router