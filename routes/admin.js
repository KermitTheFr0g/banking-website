const express = require('express');
const router = express.Router();

const admin = require('../models/admin');

router.get('/all-loans', async (req, res) => {
    //let loans = await admin.getLoans();
    let loans = await admin.getLoans();

    return res.send(loans);
})

router.get('/all-accounts', async (req, res) => {
    //let loans = await admin.getLoans();
    let balances = await admin.getBalances();

    return res.send(balances);
})

module.exports = router;