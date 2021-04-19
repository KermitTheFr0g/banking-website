const express = require("express");
const router = express.Router();
const account = require("../models/account");
const user = require("../models/user");

//if user is a customer this is the customer dashboard
router.get("/:username", async (req, res) => {
    // if the user has not yet logged in they will be sent to the 
    if(!req.session.username){
        return res.redirect("/login")
    }

    if(req.session.username === req.params.username){

        var loggedUser = {
            username: req.session.username,
            customer_id: req.session.customer_id,
        }

        const accounts = await account.checkAccounts(loggedUser);

        return res.render("../public/views/userDashboard.ejs", 
        { 
            user: req.session.username,
            account1_id: accounts.id1,
            account1_balance: accounts.balance1,
            account2_id: accounts.id2,
            account2_balance: accounts.balance2,
            account3_id: accounts.id3,
            account3_balance: accounts.balance3,
            account4_id: accounts.id4,
            account4_balance: accounts.balance4,
            amountOfAccounts: accounts.amount,
            userAdmin: await user.isAdmin(loggedUser)
        });

    } else {
        return res.redirect("/dashboard/" + req.session.username);
    }
})

//account page for user
router.get("/:username/transactions", (req, res) => {
    if(!req.session.username){
        return res.redirect("/login")
    }

    if(req.session.username === req.params.username){
        return res.send("yeah buddy");

    } else {
        return res.redirect("/dashboard/" + req.session.username + "/transactions");
    }
})

//loans page for user
router.get("/:username/loans", (req, res) => {
    if(!req.session.username){
        return res.redirect("/login")
    }

    if(req.session.username === req.params.username){
        return res.send("yeah buddy " + req.query.q);

    } else {
        return res.redirect("/dashboard/" + req.session.username + "/loans");
    }
})

module.exports = router;