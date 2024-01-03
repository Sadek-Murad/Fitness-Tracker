const express = require("express")
const router = express.Router();
const { Workout } = require("../mongoSchema/schemas");
const mongoose = require("mongoose");




router.get('/workouts', async (req, res) => {
    try {
        const allWorkouts = await Workout.find({});
        res.json(allWorkouts);
    } catch (error) {
        console.error('Failed to get workouts:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// POST Route zum Hinzufügen von Workouts
router.post('/addWorkout', async (req, res) => {
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



module.exports=router;



// Trainingsprogramm-Routen
// Statistikrouten
// Trainingsplan-Routen
// Profilrouten
// Authentifizierungsrouten

