const express = require("express");
const router = express.Router();

const account = require("../models/account");

router.post("/open", async (req, res) => {
    if(!req.session.username){
        return res.send("You need to be logged in");
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        type_id: req.body.type_id
    }

    const openAccount = await account.openAccount(userLogged);
    if(openAccount == "SUCESSFULLY CREATED ACCOUNT"){
        return res.send("Successfully created account");
    }

    return res.send("Account creation failed - " + openAccount);
})

router.delete("/close", async (req, res) => {
    if(!req.session.username){
        return res.send("You need to be logged in");
    }

    return res.send("nice")
})

router.get("/get", async (req, res) => {
    if(!req.session.username){
        return res.send("You need to be logged in");
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
    }

    const accounts = await account.viewAccounts(userLogged);
    console.table(accounts);

    return res.send(accounts)
})


module.exports = router;