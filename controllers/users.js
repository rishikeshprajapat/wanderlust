const User=require('../models/user.js');

module.exports.randersignUpForm=(req,res)=>{
   res.render("users/signup.ejs");
}

module.exports.signUpPostUser=async(req,res,next)=>{
    try{
     let {username,email,password}=req.body;
     let newUser=new User({username,email});
     let registeredUser= await User.register(newUser,password);
     console.log(registeredUser);
     req.login(registeredUser,(err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Welcome to wanderLust");
        res.redirect(req.session.redirectUrl);
     })
    //  req.flash("success","Welcome to WanderLust!");
    //  res.redirect("/listings");
    } catch(err){
         req.flash("error",err.message);
         return res.redirect("/signup");
    }
}


module.exports.randerLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err); 
        }
        req.flash("success","You are loged out!");
        res.redirect("/listings");
    })
}
