var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

//=========================================
//============Auth Routes==================
//=========================================

//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Yelp Camp " + user.username + " ,nice to meet you !");
                res.redirect("/campgrounds");
            });
        }
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged Out Successfully.");
    res.redirect("/campgrounds");
});

module.exports = router;