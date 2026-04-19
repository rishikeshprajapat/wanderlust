
const Listing=require('./models/listing');
// validate listing
const ExpressError=require("./utils/ExpressError");
const { listingSchema} = require('./schema.js');
// -----validate views
const Review=require("./models/review.js");
const {reviewSchema} = require('./schema.js');




module.exports.isLoggedIn=(req,res,next)=>{
   if(!req.isAuthenticated()){
      // redirect page save
      req.session.redirectUrl=req.originalUrl;

    req.flash("error","You must be logged in to create listing!");
    return res.redirect("/login");
   }
   next();
}  
// ---------------sassion work store in session------------

module.exports.saveRedirectedUrl=(req,res,next)=>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
   }
   next();
}
// ---------autherization of lising edit delete-----------

module.exports.isOwner=async(req,res,next)=>{
          const {id}=req.params;
           let listing=await Listing.findById(id);
           if(!listing.owner.equals(res.locals.currUser._id)){
               req.flash("error","You are not the owner of the listing!");
              return res.redirect(`/listings/${id}`);
           }
           next();
}


// ------------validate listing-----
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};


// validate reviews 


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};


// ----------
module.exports.isReviewAuther=async(req,res,next)=>{
          const {id,reviewId}=req.params;
           let review=await Review.findById(reviewId);
           if(!review.author.equals(res.locals.currUser._id)){
               req.flash("error","You are not the auther of the review!");
              return res.redirect(`/listings/${id}`);
           }
           next();
}


