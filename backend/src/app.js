const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require('../routes/routes.js'); 
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', routes);



const port = 3000;


if(app.get('env') === "development"){
    app.use(morgan('tiny'));
}


//Verbindung zur Datenbank
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
}).then(() => console.log("connected to MongoDB"))
.catch((e) => console.error("Failed to connect to MongoDB" + e));






app.listen(port, () => console.log(`It's running on port ${port}`));