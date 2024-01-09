// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { RegisterUser } = require('../mongoSchema/schemas');
require('dotenv').config();
const session = require('express-session');
const { deserialize } = require('v8');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await RegisterUser.findOne({ googleId: profile.id });
        if (!user) {

            user = await RegisterUser.findOne({ email: profile.emails[0].value });
            if (user) {

                user.googleId = profile.id;
                await user.save();
            } else {
                // Erstellen eines neuen Benutzers
                user = new RegisterUser({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    profileImage: profile.photos[0].value,
                    isNewUser: true
                });
                await user.save();
            }
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await RegisterUser.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



module.exports = passport;



// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { RegisterUser } = require('../mongoSchema/schemas');
require('dotenv').config();
const session = require('express-session');
const { deserialize } = require('v8');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await RegisterUser.findOne({ googleId: profile.id });
        if (!user) {

            user = await RegisterUser.findOne({ email: profile.emails[0].value });
            if (user) {

                user.googleId = profile.id;
                await user.save();
            } else {
                // Erstellen eines neuen Benutzers
                user = new RegisterUser({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    profileImage: profile.photos[0].value,
                    isNewUser: true
                });
                await user.save();
            }
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await RegisterUser.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



module.exports = passport;


