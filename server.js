
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ debug: true });
}


// console.log(process.env.SECRET);

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing');
const path=require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");
const { listingSchema ,reviewSchema} = require('./schema.js');
const Review=require("./models/review");

const session=require('express-session');

const MongoStore = require('connect-mongo');

const flash=require('connect-flash');

// ---------------authentication--------
const passport=require('passport');
const LocalStraregy=require('passport-local');
const User=require('./models/user.js');

// -----------------session ------------------------
const dbURL=process.env.DB_URL;



const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRETE,
  },
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionOption = {
    store,
    secret: process.env.SECRETE,
    resave: false,
    saveUninitialized: true,
    cookie: {  
        expires: Date.now() + 24 * 60 * 60 * 7 * 1000,
        maxAge: 24 * 60 * 60 * 7 * 1000, 
        httpOnly: true
    }
};



app.use(session(sessionOption));
app.use(flash());
// -----------------authentication part-----

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStraregy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ---------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));
// -------------------------------router access---------------
const listingRoutes=require("./routes/listing.js");
const reviewRoutes=require("./routes/review.js");
const userRoutes=require("./routes/user.js");



// ------------------------database connection---------------------


main()
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbURL);
}

//-------------------Validate schema --handle the backend error(by joi)-----------------------------

//      write here

// -----------------------------------------------validate review-------------
//      write here
// -------------------------------------------------------------
// app.get("/",(req,res)=>{
//     console.log("jai jp");
//     res.send("Hello World");
// })


// -----------------------
app.use((req, res, next) => {
  res.locals.query = req.query.query || "";
  next();
});
app.use((req, res, next) => {
      res.locals.success = req.flash("success");
      res.locals.error = req.flash("error");
      res.locals.currUser=req.user;
    next();
});
// ----------------------------authentiaction and autherization---------------------
app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
        email:"Student@gmail.com",
        username:"Delta student"
    })
    let registeredUser= await User.register(fakeuser,"hellowworld");
  res.send(registeredUser);
})
// -----------------------------------------------listing-------------
app.use("/listings",listingRoutes);


// --------------------------Reviews Routes-----------------


app.use("/listings/:id/reviews",reviewRoutes);

// ---------------------------------------------user---

app.use("/",userRoutes);

// ------------------------------------------



// --------------------

// ✅ 404 handler (last me)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// ✅ error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(status).send(message);
});

app.listen(3000,(req,res)=>{
    console.log("server is listening on port 3000");
})
