const express = require("express")
const router = express.Router();
const { Workout, RegisterUser } = require("../mongoSchema/schemas");
const mongoose = require("mongoose");






// Authentifizierungsrouten
router.post('/register', async (req, res) => {
    try {
        const existingUser = await RegisterUser.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(412).send({ "msg": "Email already exists." });
        }
        const newUser = new RegisterUser(req.body);
        await newUser.save();
        res.status(200).send({ Benutzer: newUser });
    } catch (error) {
        console.error("Register failed: ", error);
        res.status(500).send({ "msg": "Register failed" });
    }
});

// Loginrouten
router.post('/login', async (req, res) => {
    try {
        const existingUser = await RegisterUser.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(412).send({ "msg": "Email is not found." });
        }
        if(req.body.password !== existingUser.password)
        return res.status(401).send({ "msg": "Email or password is wrong."});
        
        const userReturn = { ...existingUser._doc };
        delete userReturn.password;

        res.status(200).send({Benutzer: userReturn});
    } catch (error){
        console.error("login failed" + error)
        res.status(500).send({"msg": "login failed"})
    }

})

//Profil
router.get('/profile/:id', async (req, res) =>{
    try {    
    const userId = req.params.id;
        const existingUser = await RegisterUser.findById(userId);
        if(!existingUser){
            return res.status(412).send({ "msg":"User not found"});
        }
        res.status(200).send(existingUser);
     } catch (error) {
        console.error("Profil retrieval failed: ", error);
        res.status(500).send({"Msg": "Error retrieving profile"});
    }

})


router.patch('/profile/:id',async (req, res) =>{
    try {    
    const userId = req.params.id
    const updateUser = req.body;
    const existingUser = await RegisterUser.findByIdAndUpdate(userId, updateUser, {new: true});
    if (!existingUser) {
       return res.status(412).send({ "msg":"User not found"});
    }  
    return res.status(200).send(existingUser);
    } catch (error){
        console.error("Profile update failed: ", error);
        return res.status(500).send({"Msg": "Error upd
"Error updating profile"})
   
    }
})












/* router.get('/workouts', async (req, res) => {
    try {
        const allWorkouts = await Workout.find({});
        res.json(allWorkouts);
    } catch (error) {
        console.error('Failed to get workouts:', error);
        res.status(500).send({ message: "Internal Server Error" });
    } */


// POST Route zum Hinzufügen von Workouts
/* router.post('/workout', async (req, res) => {
    try {
        const newWorkout = new Workout({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });
        await newWorkout.save();
        res.status(201).send(newWorkout);
    } catch (error) {
        console.error('Error creating new workout:', error);
        res.status(400).send({ message: "Error creating new workout" });
    }
});
 */


module.exports = router;



// Trainingsprogramm-Routen
// Statistikrouten
// Trainingsplan-Routen
// Profilrouten
// Authentifizierungsrouten

