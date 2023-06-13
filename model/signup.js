const mongoose = require('mongoose');
const validator = require('validator');

const signupSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },

    lastname:{
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true,
        unique : [true  , "Email already registered!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email-id!!!")
            }
        } 
    },
    phone: {
        type : Number,
        required : true,
        unique : [true  , "phone already registered!"],
    },
    password:{
        type: String,
        max:6,
        required:true
    },
    confirmP:{
        type : String,
        required : true
    },

})

const User = new mongoose.model('UserLogin' , signupSchema);
module.exports = User;