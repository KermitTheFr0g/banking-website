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
    console.log(req.session);
    return res.render("../public/views/login.ejs");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.send("welcome to the forgot-password page");
})

//if user is a customer this is the customer dashboard
router.get("/dashboard/:username", (req, res) => {

})


module.exports = router;