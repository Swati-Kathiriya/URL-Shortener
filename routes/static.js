const express = require("express");
const URL = require('../models/url');
const router = express.Router();
const { restrictto } = require("../middleware/auth");

router.get('/admin/urls', restrictto(['ADMIN']), async (req, res) => {
    // if(!req.user) return res.redirect("/login")
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    });
});

router.get('/', restrictto(["NORMAL"]), async (req, res) => {
    // if(!req.user) return res.redirect("/login")
    const allurls = await URL.find({ createdBy: req.user._id })
    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;