const mongoose=require('mongoose');
const Listing=require('../models/listing.js');
const sampleData=require('./init.js');
const { init } = require('../models/user.js');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/trip_planner');
    console.log("Database connected");
}

async function seedDB(){
    await Listing.deleteMany({});
   sampleData.data=sampleData.data.map((obj)=>({...obj,owner:"69d1ebbf52583803039de5d2"}));
    await Listing.insertMany(sampleData.data);
}

seedDB();