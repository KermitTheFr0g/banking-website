const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("../public/views/home.ejs", { name: "alex" });
})

router.get("/signup", (req, res) => {
    return res.send("welcome to the signup page");
})

router.get("/login", (req, res) => {
    return res.render("../public/views/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.send("welcome to the forgot-password page");
})

//if user is a customer this is the customer dashboard
router.get("/home/:username", (req, res) => {
    res.send(req.params.username);
})


module.exports = router;