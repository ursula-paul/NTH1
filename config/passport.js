const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/Users')


module.exports = function(passport) {
	passport.use(
		new localStrategy({usernameField: 'email'}, (email,password,done) =>{
			//match user using mongoose
			User.findOne({ email: email})
				.then(user =>{
					if (!user){
						return done(null, false, {message: 'That email is not registered' })
					}
		

					bcrypt.compare(password, user.password, (err, isMatch)=>{
						if(err) {
							console.log(err)
						}
						if(isMatch) {
							return done(null, user)
						}else{
							return done(null, false, {message: 'password is incorrect'})
						}
					})
                })
				.catch(err => console.log(err))
	}))

}


passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    })
})