const fs = require('fs');
const http = require('http');
const https = require('https');
const pkey = fs.readFileSync('../Auth/fitness-selfsigned.key', 'utf-8');
const cert = fs.readFileSync('../Auth/fitness-selfsigned.crt', 'utf-8');
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require('../routes/routes.js');
require('dotenv').config();
const passport = require('../Auth/auth.js')
const session = require('express-session');

const credentials = {key: pkey, cert: cert};




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

// Konfig der http/s server

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


const port = 3000;
const secport = 3333;




//Verbindung zur Datenbank
mongoose.connect(`mongodb://localhost:27017/Fitness-Tracker`, {
}).then(() => console.log("connected to MongoDB"))
    .catch((e) => console.error("Failed to connect to MongoDB" + e));

httpServer.listen(port, () => console.log(`http listen on port ${port}`));
httpsServer.listen(secport, () => console.log(`https listen on port ${secport}`));






// app.listen(port, () => console.log(`It's running on port ${port}`));