// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { RegisterUser } = require('../mongoSchema/schemas');
require('dotenv').config();
const session = require('express-session');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
    scope: ['profile', 'email']
}, async (accesstoken, requesttoken, profile, done) => {
    console.log("accesstoken", accesstoken);
    console.log("requesttoken", requesttoken);
    console.log("Profile", profile);
    try {
        let user = await RegisterUser.findOne({ googleId: profile.id });
        if (!user) {
            user = new RegisterUser({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                profileImage: profile.photos[0].value,
                isNewUser: true,
            });
            user.save();
            await done(null, user);

        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



module.exports = passport;


