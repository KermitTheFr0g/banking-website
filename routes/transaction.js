const express = require("express");
const router = express.Router();

const transactions = require("../models/transaction");

router.post("/pay", async (req, res) => {

    var loggedUser = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        sendingAct: req.body.account_id,
        reveivingAct: req.body.receivingAct,
        amount: req.body.amount,
        date: new Date()
    };



    return res.send("you have made a payment");
})

router.post("/get", async (req, res) => {
    if(!req.session.username){
        return res.send("you need to be logged in");
    }

    var loggedUser = {
        username: req.session.username,
        customer_id: req.session.customer_id
    }

    const transactions = await transactions.pay(loggedUser);

    return res.send(transactions);
})

module.exports = router;