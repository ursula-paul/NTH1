const { Router } = require('express');
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type: String, 
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    converstion:[],
   
})


const User = new mongoose.model('User', userschema)

module.exports = User