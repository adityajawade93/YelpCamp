var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var Middleware = require("../middleware");

//Comments new
router.get("/new", Middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments create
router.post("/", Middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added your comment.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//Edit Routes
//edit form
router.get("/:comment_id/edit", Middleware.checkUserComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Successfully edited the comment.");
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

//handle put request from edit route
router.put("/:comment_id", Middleware.checkUserComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy Rotue
router.delete("/:comment_id", Middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if ( err ) {
            console.log(err);
        } else {
          req.flash("success", "comment Deleted");    
          res.redirect("/campgrounds/" + req.params.id);  
        } 
    });
});

module.exports = router;