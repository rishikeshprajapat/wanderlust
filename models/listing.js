const mongoose=require('mongoose');
const { type } = require('node:os');
const { stringify } = require('node:querystring');
const Review = require("../models/review");
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        // type:String,
        // default:"https://via.placeholder.com/150",
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }
],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
         enum: ["trending","rooms","iconic-city","mountains","castles","amazing-pool","camping","farms","arctic"]
    },
    geometry: {
       type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
     type: [Number],
     required: true
  }
}
});
// ---------delete the review when listing is deleted---------------------

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({  _id:{$in:listing.reviews }});
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;