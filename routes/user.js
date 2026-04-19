const express=require("express");

const router=express.Router();

const wrapAsync=require("../utils/Wrapasync");

const passport=require('passport');

const User=require('../models/user.js');

const Wrapasync = require("../utils/Wrapasync.js");

const { saveRedirectedUrl } = require("../middleware.js");

const usersControllers=require('../controllers/users.js');

// -------

router.route("/signup")
.get(usersControllers.randersignUpForm)
.post(wrapAsync(usersControllers.signUpPostUser));

// router.get("/signup",usersControllers.randersignUpForm);
// // ------
// router.post("/signup",wrapAsync(usersControllers.signUpPostUser));
// ------------

router.route("/login")
.get(usersControllers.randerLoginForm)
.post(saveRedirectedUrl,passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),async(req,res)=>{
     req.flash("success","Welcome back to WanderLust!");
     let redirectUrl=req.session.redirectUrl || "/listings";
     res.redirect(redirectUrl);
})

// router.get("/login",usersControllers.randerLoginForm);
// // -----------
// router.post("/login",saveRedirectedUrl,passport.authenticate("local",{ failureRedirect: '/login' ,failureFlash:true}),async(req,res)=>{
//      req.flash("success","Welcome back to WanderLust!");
//      let redirectUrl=req.session.redirectUrl || "/listings";
//      res.redirect(redirectUrl);
// })
// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true
// }), (req, res) => {

//     req.flash("success", "Welcome back to WanderLust!");

//     let redirectUrl = req.session.redirectUrl || "/listings";
//     delete req.session.redirectUrl;

//     res.redirect(redirectUrl);
// });

router.get("/logout",usersControllers.logoutUser)

module.exports=router;