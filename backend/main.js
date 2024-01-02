const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(express);
const port = 3000;


//Verbindung zur Datenbank
mongoose.connect('mongodb://172.0.0.1:3000', {
}).then(() => console.log("connected"))
.catch((e) => console.error("Failed" + e));






app.listen(port, () => console.log(`Es geht auf port ${port}`));