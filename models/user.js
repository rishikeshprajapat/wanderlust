const mongoose=require('mongoose');

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    }
})


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);