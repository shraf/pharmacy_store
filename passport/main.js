
const mongoose=require('mongoose');
 const passportUtil=()=>{
    const passport =require('passport');
    const Strategy=require("passport-facebook").Strategy;
passport.use(new Strategy({
    clientID: "281106223385175",
    clientSecret: "baa8095ebf5f1248243c9636b5e06184",
    callbackURL: '/facebook/callback' ,
    profileFields: ['id', 'displayName', 'email', 'name'],
    passReqToCallback: true
  },
  (req,accessToken,refreshToken,profile,cb)=>{

    return cb(null,profile);
  }
  ))
  
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  return {passport,Strategy}
}
module.exports= passportUtil;