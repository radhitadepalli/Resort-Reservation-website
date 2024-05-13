const express= require("express");
const router= express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");


const ReviewController=require("../controllers/reviews.js");

const {isLoggedIn,validateReview, isreviewAuthor}=require("../middleware.js");



//Reviews
//POST Review route
router.post("/", isLoggedIn,validateReview,wrapAsync(ReviewController.createReview));

//Delete Review route

router.delete("/:reviewId",isLoggedIn,isreviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports=router;