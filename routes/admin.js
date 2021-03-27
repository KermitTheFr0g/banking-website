const express = require("express");
const router = express.Router();

router.get("/dashboard/:username", (req, res) => {
    if(!req.session.username){
        return res.redirect("/login");
    }

    if(!req.session.admin){
        return res.redirect("/dashboard/" + req.session.username);
    }

    if(!req.session.username === req.params.username){
        return res.redirect("/admin/dashboard/" + req.session.username);
    }


    return res.render("../public/views/adminDashboard.ejs", 
    { 
        user: req.session.username,
        balance: 0
    })
})



module.exports = router;