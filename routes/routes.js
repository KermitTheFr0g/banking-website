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
    return res.render("../public/views/signup.ejs");
})

router.get("/login", (req, res) => {
    return res.render("../public/views/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.render("../public/views/forgotPassword.ejs");
})

router.get("/logout", (req, res) => {
    if(!req.session.username){
        return res.send("You are not yet logged in");
    }
    // if the user is an admin
    if(req.session.admin){
        console.log("Admin logged out - " + req.session.username);
        req.session.destroy();
        return res.redirect("/home");
    }

    console.log("User logged out - " + req.session.username);
    req.session.destroy();
    return res.redirect("/home");
})

module.exports = router;