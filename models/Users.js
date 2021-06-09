const { Router } = require('express');
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    converstion:[
    {
        message: String,
        
    }
        
    ],
   
})


const User = new mongoose.model('User', userschema)

module.exports = User