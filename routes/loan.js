const express = require("express");
const router = express.Router();

const loan = require("../models/loan");

router.post("/create", async (req, res) => {
    if(!req.session.username){
        return res.send("User needs to be logged in")
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        amount: req.body.amount,
        date: new Date()
    };

    const createdLoan = await loan.createLoan(userLogged);
    if(createdLoan){
        return res.send("Loan has been created");
    }

    return res.send("Loan creation has been failed")
})


router.post("/pay", async (req, res) => {
    if(!req.session.username){
        return res.send("User needs to be logged in")
    }

    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
        loan_id: req.body.loan_id,
        amount: req.body.amount,
        from: req.body.account_id
    }

    

    const payLoan = await loan.payLoan(userLogged);

    return res.send("pog")
})

router.get("/get", async (req, res) => {
    if(!req.session.username){
        return res.send("User needs to be logged in")
    }
    
    var userLogged = {
        username: req.session.username,
        customer_id: req.session.customer_id,
    };
    const userLoans = await loan.getLoans(userLogged);
    console.table(userLoans);

    return res.send("finsihed");
})

module.exports = router;