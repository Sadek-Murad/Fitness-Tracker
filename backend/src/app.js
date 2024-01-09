const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require('../routes/routes.js');
require('dotenv').config();
const passport = require('../Auth/auth.js')
const session = require('express-session');




const app = express();

app.use(session({
    secret: process.env.key,
    resave: false,
    saveUninitialized: true,
}))

// Initialisierung von Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS (Cross Origin Ressource Sharing) aktivieren
const cors = require('cors');

// CORS Options definieren
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Express mit Json Req/Res aktivieren
app.use(express.json(), cors(corsOptions));

app.use('/api', routes);
app.use(morgan('dev'));



const port = 3000;



//Verbindung zur Datenbank
// mongoose.connect(`mongodb://localhost:27017/Fitness-Tracker`, {
mongoose.connect(`mongodb+srv://ft-db:oToWm1tPUDYZDpga@fitty-tracker.ucnz3cm.mongodb.net/?retryWrites=true&w=majority`, {
}).then(() => console.log("connected to MongoDB"))
    .catch((e) => console.error("Failed to connect to MongoDB" + e));





app.listen(port, () => console.log(`It's running on port ${port}`));