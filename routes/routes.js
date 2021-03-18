const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json({ message: "connected" });
})

router.get("/home", (req, res) => {
    return res.send("welcome to the home page");
})

router.get("/signup", (req, res) => {
    return res.send("welcome to the signup page");
})

router.get("/login", (req, res) => {
    return res.send("welcome to the login page");
})

router.get("/login/forgotten-password", (req, res) => {
    return res.send("welcome to the forgot-password page");
})

module.exports = router;