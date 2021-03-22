const express = require("express");
const router = express.Router();

router.get("/dashboard/:username", (req, res) => {
    if(!req.session.username){
        res.redirect("/login");
    }

    if(!req.session.admin){
        res.redirect("/dashbaoard/" + req.session.username);
    }

    



})



module.exports = router;