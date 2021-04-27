const express = require("express");
const router = express.Router();

router.get("/dashboard/:username", (req, res) => {
    // check if they are logged in
    // not redirected to the login page
    if(!req.session.username){
        return res.redirect("/login");
    }

    // check if they are an admin
    // if not redirected to their dashboard page
    if(!req.session.admin){
        return res.redirect("/dashboard/" + req.session.username);
    }

    if(req.params.username == req.session.username){
        return res.render("../public/views/adminDashboard.ejs", 
        { 
            user: req.session.username,
            balance: 0
        })
    } else {
        return res.redirect("/admin/dashboard/" + req.session.username)
    }
})



module.exports = router;