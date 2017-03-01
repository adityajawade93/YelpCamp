var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Middleware = require("../middleware");

//INDEX - shows all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allcampgrounds});
        }
    });
});

//NEW - shows a form to add new campground
router.get("/new", Middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//CREATE - add a new campground to the db
router.post("/", Middleware.isLoggedIn, function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, image: image, description: description, author: author};
    //add to new campground to db
    Campground.create(newCampground, function(err, campground){
        if(err)
            console.log("error");
        else
            console.log("newly campground created\n");
    });
    
    //redirect to campgrounds page
    res.redirect("/campgrounds");
});


//SHOW additional info about campground (put this after /campgrounds/new or else it will catch all the requests for that too)
router.get("/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//Edit Campgrounds
//Edit Form
router.get("/:id/edit", Middleware.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    });
});

//handle the edit logic
router.put("/:id", Middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy campground route
router.delete("/:id", Middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "campground deleted.");
            res.redirect("/campgrounds");
        }
    });
});
module.exports = router;