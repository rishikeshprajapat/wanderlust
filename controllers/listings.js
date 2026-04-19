const Listing=require('../models/listing');
const { cloudinary } = require("../cloudConfig");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// show all listing form --------

// module.exports.index=async(req,res)=>{
//         const listings=await Listing.find({});
//         res.render("listings/index.ejs",{lists:listings});
   
// }

module.exports.index = async (req, res) => {
  let { query } = req.query;

  let allListings;

  if (query && query.trim() !== "") {

    let filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } }
      ]
    };

    if (!isNaN(query)) {
      filter.$or.push({ price: Number(query) });
    }

    allListings = await Listing.find(filter);

  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index", { allListings, query });
};

// ----------new rander form ----------
module.exports.newRanderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}
// ------show listing-----------------
module.exports.showListing=async(req,res)=>{
        const {id}=req.params;
        const listing = await Listing.findById(id).populate({ path: "reviews",populate: {path: "author"}})
        .populate("owner"); 
        if(!listing){
            req.flash("error", "Listing you request for does not exit!");
             return  res.redirect("/listings");
        }
        let originalImageUrl=listing.image.url;
        let  originalImageUrl1= originalImageUrl.replace("/upload","/upload/w_250");
       res.render("listings/show.ejs",{
      list: listing,
      originalImageUrl1,
      mapToken: process.env.MAP_TOKEN
      });
}

// --------------------------create listing------------------

module.exports.createListing=async (req, res) => {
// map
const response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
  

  // -----
    let url = req.file.path; 
    let filename=req.file.filename
    
    // optional safety check
    if (!req.body.listing || !req.body.listing.title) {
        throw new ExpressError(400, "Invalid listing data");
    }
    const listing = new Listing(req.body.listing); 
    // new user info 
    listing.owner=req.user._id;
    listing.image={url,filename};
    listing.geometry=response.body.features[0].geometry;

    let savedListing=await listing.save();
     
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
}

// -----------------------------edit listing----------------

module.exports.editFormListing=async(req,res)=>{
    const {id}=req.params;
    //-----------------if list is deleted already-------------------------
        const listing=await Listing.findById(id);
         if(!listing){
               req.flash("error", "Listing you request for does not exit!");
             return  res.redirect("/listings");
        }
        // res.render("listings/edit.ejs",{listing:listing});
        let originalImageUrl1 = listing.image.url;

res.render("listings/edit", { listing, originalImageUrl1 });
        
}

module.exports.putListingRoute=async(req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, returnDocument: "after" });
    if (typeof req.file !== "undefined") {
    let url = req.file.path; 
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
}
    req.flash("success", "Listing updated successfully!");
    res.redirect("/listings");
}
// --------delete listing---------------
module.exports.deleteListing=async(req,res)=>{
     const { id } = req.params;
    // 1. Find listing
    const listing = await Listing.findById(id);

    // 2. Delete image from Cloudinary
    if (listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    // 3. Delete from DB
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}