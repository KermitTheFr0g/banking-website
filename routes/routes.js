const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("../public/views/home.ejs", { name: "alex" });
})

router.get("/signup", (req, res) => {
    return res.send("welcome to the signup page");
})

router.get("/login", (req, res) => {
    req.session.username = "kermit";
    return res.render("../public/views/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.send("welcome to the forgot-password page");
})

//if user is a customer this is the customer dashboard
router.get("/home/:username", (req, res) => {

    return console.log(req.params.username);

    if(!req.session.username){
        return res.redirect("/login");
    }

    if(!req.params.username == req.session.username){
        return res.send("not the correct email");
    }

    res.render("../public/view/home.ejs", { name: req.session.username });
})


module.exports = router;