const express = require("express");
const router = express.Router();

router.get("/dashboard/:username", (req, res) => {
    if(!req.session.username){
        res.redirect("/login");
    }

    if(!req.session.admin){
        res.redirect("/dashboard/" + req.session.username);
    }

    if(!req.session.username === req.params.username){
        res.redirect("/admin/dashboard/" + req.session.username);
    }

    
    res.send("admin dashboard")
})



module.exports = router;