let email;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const passport = require('passport');
const {User} = require("../model/user.model.js")
const { v4: uuidv4 } = require('uuid');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8887/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    console.log(profile._json.email)
    email=profile._json.email
    const user=new User({
        email,
        password:uuidv4()
    })
    await user.save()
    const {_id,password}=user
    const payload={
        email,
        _id,
        password,
        url:profile._json.picture
    }
     return cb(null, payload);
    
  }
));

const googlemailauth = async (req,res)=>{
    if(email){
        const Userdata =await User.findOne({email})
if(Userdata){
    req.userId = Userdata._id,
    req.email = Userdata.email
    console.log(req.userId)
    console.log(req.email)
    next()
}else{
 res.send("please login")
}
} 
}
module.exports={passport,email,googlemailauth}
