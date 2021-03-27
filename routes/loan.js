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
        account_id: req.body.account_id,
        date: new Date()
    };

    const createdLoan = await loan.createLoan(userLogged);
    if(createdLoan == "CREATED"){
        return res.send("Loan has been created");
    }

    return res.send("Loan creation failed - " + createdLoan);
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
    if(payLoan == "LOAN_PAID"){
        return res.send("Loan successfully paid")
    }

    return res.send("Paying loan failed - " + payLoan);
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

    return res.send(userLoans);
})

module.exports = router;