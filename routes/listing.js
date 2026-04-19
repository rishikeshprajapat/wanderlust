const express=require("express");

const router=express.Router();

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const wrapAsync=require("../utils/Wrapasync");

const { populate } = require("../models/user.js");

const listingController=require("../controllers/listings.js");

// use for cloud storage
const{ storage}=require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({ storage })


// -----------------------------------------validate listing-----------------

// middleware

// ----------do the router.route--------------------------
router.route("/")
.get(wrapAsync(listingController.index))
 .post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));
// .post( upload.single('listing[image]'),(req,res)=>{
// res.send(req.file);
// });






router.get("/new",isLoggedIn,listingController.newRanderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.putListingRoute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

//.get("/edit",isLoggedIn,isOwner,wrapAsync(listingController.editFormListing));

// -----------------------------all listing----------------

// router.get("/",wrapAsync(listingController.index));
// ----------------------------new listing------------------

//router.get("/new",isLoggedIn,listingController.newRanderNewForm);

// -------------------------------show listing only one---------------

//router.get("/:id",wrapAsync(listingController.showListing));

// --------------------------create listing------------------

//router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// -----------------------------edit listing----------------
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editFormListing));

// put edit ---

//router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.putListingRoute));

// --------delete listing---------------
//router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


module.exports=router;





 