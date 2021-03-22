const express = require("express");
const router = express.Router();

//if user is a customer this is the customer dashboard
router.get("/:username", (req, res) => {
    if(!req.session.username == req.params.username){
        res.redirect("/" + req.session.username);
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