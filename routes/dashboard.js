const express = require("express");
const router = express.Router();

//if user is a customer this is the customer dashboard
router.get("/:username", (req, res) => {
    // if the user has not yet logged in they will be sent to the 
    if(!req.session.username){
        res.redirect("/login")
    }

    if(req.session.username === req.params.username){
        res.send("welcome to the dashboard");
    } else {
        res.redirect("/dashboard/" + req.session.username);
    }
})

//account page for user
router.get("/:username/accounts", (req, res) => {
    res.send(req.params.username);
})

//loans page for user
router.get("/:username/loans", (req, res) => {
    res.send(req.params.username);
})

module.exports = router;