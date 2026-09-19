const express=require("express");

const router = express.Router({ mergeParams: true }); 
//  because we need access to the :id parameter from the parent route (listings/:id/reviews)

const wrapAsync=require("../utils/wrapAsync");

const {listingSchema,reviewSchema} = require('../schema.js');
// ------
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js");

const reviewController=require('../controllers/reviews.js');
//--------------------validate reciew--------------------------------

//middleware

// ---------------------------------create review-------------------
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createNewReview)
);

// -------------------------------delete review------------------------
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReviews)
);

module.exports=router;