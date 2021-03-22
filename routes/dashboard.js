const express = require("express");
const router = express.Router();

//if user is a customer this is the customer dashboard
router.get("/dashboard/:username", (req, res) => {
    res.send(req.params.username);
})






module.exports = router;