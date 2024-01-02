const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require('../routes/routes.js'); 
const workout = require("../mongoSchema/schemas");
const router = express.Router();
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


const workout1 = mongoose.model("workout", workout);

async function createWorkout() {
    const workout = new workout1( {
        id:1,
        title: "Leg Extension",
        description: "nynnynyn",
        image: "https://www.swrfernsehen.de/kaffee-oder-tee/ratgeber/1691410387090%2Ckatze-184~_v-16x7@2dL_-594eb175bf96444e7f86c89c3d9f78feed295e4a.jpg"
    })
    await workout.save();
    
}



router.get('/', (req, res) => {
    createWorkout();
    res.send(workout);

}) 

router.post('/addWorkout', async (req, res) =>{
    try{
        const workout = new workout1( {
            id:req.body.id,
            title: req.body,title,
            description: req.body.description,
            image: req.body.image
        })
        await workout.save();
        res.status(201).send(workout);
    }
    catch(error){
        res.status(400).send("error new workout")
    }
})




app.listen(port, () => console.log(`It's running on port ${port}`));