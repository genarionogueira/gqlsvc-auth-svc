import GoogleStrategy from 'passport-google-oauth20';
import * as config from '../config.js';


const googleStrategy =  new GoogleStrategy.Strategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback   : true,
    state: true
  }, function verify(request, accessToken, refreshToken, profile, done){
    return done(null, profile);
 })

 export {
    googleStrategy
 }
