var express = require('express');
const User = require('../models/Users');
var router = express.Router();
const bcrypt = require('bcrypt')
const {ensureAuthenticated} = require('../config/auth')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/register', function(req, res) {
    const {name, email, password, password1} = req.body
      // create errors array
    const errors = []
    
    if(!name || !email || !password || !password1){
      errors.push({msg: 'please fill in all fields'})
    }
    if(password.length <6){
      errors.push({msg: 'please ensure password is greater than 6 characters'})
    }
    if(password !== password1){
      errors.push({msg: 'passwords do not match'})
    }

    if(errors.length > 0){
      res.render('index', { errors })
    }
    
    else{
      User.findOne({email: email})
      .then(user => {	
        if(user) {
          errors.push({msg: 'Email is already registered'})
          res.render('index', {errors	})
        }
        else{
          const newUser = new User({
            name,
            email,
            password
          })
          bcrypt.genSalt(10, (err, salt)=> {
					  bcrypt.hash(newUser.password, salt, (err, hash) =>{
              if (err) throw err
						  newUser.password = hash
						  newUser.save()
              .then(user =>{
								res.redirect('/users/login')
							})
							.catch(err => console.log(err))

            })

          })
        }
        
      })
      .catch(err => console.log(err))
    }
})


// the remaining routing logic

router.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('dashboard');
});



router.get('/profile', ensureAuthenticated, function(req, res) {
  res.render('profile');
});

router.get('/chats', ensureAuthenticated, function(req, res) {
  res.render('chat');
});

router.post('/chats:id', ensureAuthenticated, function(req, res) {
res.render('chat')
console.log(req.body)
  const {message} = req.body

  const id = "60c356f7e066e6240c280933"

  User.findOneAndUpdate(
    { _id: id },
    { $push: { converstion: message}},
    {upset: true},
    (err,data) =>{
      if(err){
        console.log(err),
        res.render('chat')
        
      }else{
        res.render('chat', { data: data } );
      }
    }
   
  )
  
});


router.get('/chats',ensureAuthenticated, function(req, res){
  users.findOne(conversation, (err, data)=>{
    if(err) {
      throw err
    }else{
      console.log(data)
    }
  }
  )
}
)

router.get('/rooms', ensureAuthenticated, function(req, res) {
  res.render('rooms');
});


module.exports = router;




  
    
    
    