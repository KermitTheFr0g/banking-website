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
    console.log(openAccount)

    return res.send("pog bro");
})

router.get("/view", async (req, res) => {
    if(!req.session.username){
        return res.send("You need to be logged in");
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
    }

    const accounts = await account.viewAccounts(userLogged);
    console.table(accounts);

    return res.send("epic bro")
})


module.exports = router;