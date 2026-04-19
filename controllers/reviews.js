 const Review=require("../models/review.js"); 
 const Listing=require("../models/listing.js");

// ---------------------------------create review-------------------

 module.exports.createNewReview=async (req, res) => {
   
     let { id } = req.params;
 
     const listing = await Listing.findById(id);
 
     const newReview = new Review(req.body.review);
      newReview.author = req.user._id;
     //  console.log(newReview);
      
   
 
     await newReview.save();
     
       listing.reviews.push(newReview._id);
 
     await listing.save();
 
     req.flash("success", "Review created successfully!");
 
     res.redirect(`/listings/${id}`);
   }
// ------------------delete review 
   module.exports.deleteReviews=async(req,res)=>{
       const {id,reviewId}=req.params;
       await Review.findByIdAndDelete(reviewId);
       await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
      req.flash("success", "Review Deleted successfully!!");
       res.redirect(`/listings/${id}`);
   
   }



