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
}, async (accessToken, refreshToken, profile, done) => {
    // Abruf von Nutzerdaten, einschließlich Vor- und Nachname
    const existingUser = await RegisterUser.findOne({ googleId: profile.id });
    if (existingUser) {
        // Nutzer existiert bereits, Weiterleitung oder Update der Daten
        done(null, existingUser);
    } else {
        // Neuer Nutzer, Speichern der Daten inklusive Profilbild und Namen
        const newUser = new RegisterUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstname: profile.name.givenName, // Vorname
            lastname: profile.name.familyName, // Nachname
            profileImage: profile.photos[0].value, // URL des Profilbilds
            isNewUser: true
        });
        await newUser.save();
        done(null, newUser);
    }
}));

// ... (Serialisierung und Deserialisierung)
module.exports = passport;
