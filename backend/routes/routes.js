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

