const mongoose=require('mongoose');

var UserProfile=mongoose.model('UserProfile',{
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    profileimage: {type: String},
    email: {type: String},
    password: {type: String},
})

module.exports={UserProfile};