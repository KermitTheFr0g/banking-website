const express = require("express");
const router = express.Router();
const Validation = require("../validation/user");

router.get("", (req, res) => {
    return res.redirect("/home");
})

router.get("/home", (req, res) => {
    return res.render("../public/views/home.ejs", { name: "oli" });
})

router.get("/signup", (req, res) => {
    return res.render("../public/views/user/signup.ejs");
})

router.get("/login", (req, res) => {
    req.session.username = "kermit";
    req.session.admin = true;
    return res.render("../public/views/user/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.render("../public/views/user/forgotPassword.ejs");
})

module.exports = router;