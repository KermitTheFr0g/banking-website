const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
    res.redirect("/")
})

router.get("/home", (req, res) => {
    res.render("../public/views/home.ejs", { name: "oli" });
})

router.get("/signup", (req, res) => {
    res.render("../public/views/signup.ejs");
})

router.get("/login", (req, res) => {
    req.session.username = "kermit";
    console.log(req.session);
    return res.render("../public/views/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    res.render("../public/views/forgotPassword.ejs");
})


module.exports = router;