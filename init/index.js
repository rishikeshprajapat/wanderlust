const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const sampleData = require("./init.js");

async function main() {
    const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/trip_planner";

    await mongoose.connect(dbURL);
    console.log("Database connected");

    await seedDB();
}

async function seedDB() {
    await Listing.deleteMany({});

    const listings = sampleData.data.map((obj) => ({
        ...obj,
        owner: "69d1ebbf52583803039de5d2",
    }));

    await Listing.insertMany(listings);
    console.log("Sample data inserted");
}

main()
    .catch((err) => console.error(err))
    .finally(async () => {
        await mongoose.connection.close();
    });