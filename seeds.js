var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://goo.gl/Sm4xqU",
            description: "Bacon ipsum dolor amet shank sirloin tenderloin meatball. Shankle andouille flank boudin doner, burgdoggen drumstick tenderloin. Chuck spare ribs frankfurter andouille. Alcatra turkey pork loin ground round, sirloin drumstick flank. Meatball kielbasa rump alcatra jerky cupim short loin. Pastrami shoulder chicken drumstick brisket ball tip capicola pig hamburger turducken beef ribs ham porchetta. Boudin ham swine, beef ribs pork meatloaf picanha brisket prosciutto venison."
        },
        {
            name: "Mountain Avenue",
            image: "https://goo.gl/8YIs7y",
            description: "Bacon ipsum dolor amet shank sirloin tenderloin meatball. Shankle andouille flank boudin doner, burgdoggen drumstick tenderloin. Chuck spare ribs frankfurter andouille. Alcatra turkey pork loin ground round, sirloin drumstick flank. Meatball kielbasa rump alcatra jerky cupim short loin. Pastrami shoulder chicken drumstick brisket ball tip capicola pig hamburger turducken beef ribs ham porchetta. Boudin ham swine, beef ribs pork meatloaf picanha brisket prosciutto venison."
        },
        {
            name: "Grounders Nest",
            image: "https://goo.gl/suJF1O",
            description: "Bacon ipsum dolor amet shank sirloin tenderloin meatball. Shankle andouille flank boudin doner, burgdoggen drumstick tenderloin. Chuck spare ribs frankfurter andouille. Alcatra turkey pork loin ground round, sirloin drumstick flank. Meatball kielbasa rump alcatra jerky cupim short loin. Pastrami shoulder chicken drumstick brisket ball tip capicola pig hamburger turducken beef ribs ham porchetta. Boudin ham swine, beef ribs pork meatloaf picanha brisket prosciutto venison."
        }
    ];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err){
        // if(err)
        //     console.log(err);
        // console.log("removedCampgrounds") ; 
        // //add a few campgrounds
        //  data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground) {
        //         if(err){
        //             console.log(err);
        //         }else{    
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create({
        //                 text: "This place is awesome but i wish it had internet",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("comment created")
        //                 }
        //             });
        //         }
        //     });
        // });
        
        
    
    });
}

module.exports = seedDB;
