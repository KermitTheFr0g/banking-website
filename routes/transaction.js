const express = require("express");
const transaction = require("../models/transaction");
const router = express.Router();

const transactions = require("../models/transaction");

router.post("/pay", async (req, res) => {
    if(!req.session.username){
        return res.send("You need to be logged in");
    }


    var loggedUser = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        sendingAct: req.body.account_id,
        customerReceiving: req.body.customerReceiving,
        receivingAct: req.body.receivingAct,
        amount: req.body.amount,
        date: new Date()
    };

    const payment = await transaction.pay(loggedUser);
    if(payment == "PAYMENT SUCCESSFUL"){
        return res.send(payment);
    }

    return res.send(payment);
})

router.get("/get", async (req, res) => {
    if(!req.session.username){
        return res.send("you need to be logged in");
    }

    var loggedUser = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        account_id: req.body.account_id || "ALL"
    }

    const tx = await transactions.getTransactions(loggedUser);

    return res.send(tx);
})

module.exports = router;