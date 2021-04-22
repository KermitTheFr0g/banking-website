const express = require('express');
const router = express.Router();

const admin = require('../models/admin');

router.get('/all-loans', async (req, res) => {
    let loans = await admin.getAllLoans();

    return res.send(loans);
})

module.exports = router;