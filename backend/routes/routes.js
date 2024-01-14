const express = require("express")
const router = express.Router();
const { IndividualWorkout, RegisterUser, Exercise, Statistic } = require("../mongoSchema/schemas");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('../Auth/auth');
const session = require('express-session');
const path = require("path");
const { Db } = require("mongodb");

// Authentifizierungsrouten
//Google Authentifizierung starten
router.get('/auth/google', passport.authenticate('google'));


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            if (req.user.isNewUser) {
                res.redirect('https://fitness-frontend-origin.s3.eu-central-1.amazonaws.com/additional-info/additional-info.html?id=' + req.user._id);
            } else {
                res.redirect('https://fitness-frontend-origin.s3.eu-central-1.amazonaws.com/profile/profile.html?id=' + req.user._id);
            }
        } catch (error) {
            console.error('Error in authentication process:', error);
            res.redirect('/error');
        }
    }
);

router.post('/additional-info', async (req, res) => {
    try {
        await RegisterUser.findByIdAndUpdate(req.body.id, {
            age: req.body.age,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight,
            isNewUser: false
        }, { new: true });
        // res.status(200).send({ "id": req.body.id });
        res.redirect(301, `https://fitness-frontend-origin.s3.eu-central-1.amazonaws.com/profile/profile.htmlq?id=${req.body.id}`);
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).send('Server Error');
    }
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});




// Profilrouten
//Get information
router.get('/profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const existingUser = await RegisterUser.findById(userId);
        if (!existingUser) {
            return res.status(412).send({ "msg": "User not found" });
        }
        res.status(200).send(existingUser);
    } catch (error) {
        console.error("Profil retrieval failed: ", error);
        res.status(500).send({ "Msg": "Error retrieving profile" });
    }

})

// Profilrouten
//Update the user
router.patch('/profile/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const updateUser = req.body;
        const existingUser = await RegisterUser.findByIdAndUpdate(userId, updateUser, { new: true });
        if (!existingUser) {
            return res.status(412).send({ "msg": "User not found" });
        }
        return res.status(200).send(existingUser);
    } catch (error) {
        console.error("Profile update failed: ", error);
        return res.status(500).send({ "Msg": "Error updating profile" })

    }
})

// Trainingsprogramm-Routen
// GET-Route für das Abrufen aller Übungen
router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send({ "msg": "Fehler beim Abrufen der Übungen", error: error });
    }
});

/* router.post('/workout/:id', async (req, res) => {
    const userId = req.params.id;
    // console.log('XXXXXXXXXXXXXX', userId);
    try {
        const workouts = req.body;
        for (let workout of workouts) {
            workout.userId = userId;
        }
        // console.log('workouts', workouts);
        if (!Array.isArray(workouts)) {
            return res.send(400).send({ 'Msg': 'Input must be an array' });
        }
        for (const workoutData of workouts) {
            const neuWorkout = new IndividualWorkout({
                workoutId: workoutData.workoutId,
                userId: workoutData.userId,
                exerciseId: workoutData.exerciseId,
                sets: workoutData.sets
            })
            await neuWorkout.save();
        }
        res.status(200).send({ 'Msg': 'Workout successfuly saved' });
        // res.redirect(301, `http://localhost:5500/frontend/trackWorkout/trackWorkout.html?id=${req.body.id}`)
    } catch (error) {
        console.error('Error saving workouts', error)
        res.status(500).send('Error saving workouts')
    }
}) */

router.post('/userworkout/:id', async (req, res) => {
    let userId = "659fbd2b7290ab53c0b5ca38"
    // const userId = req.params.id;
    const existingUser = await RegisterUser.findById(userId)
    console.log('existingUser', existingUser)
    try {
        const workouts = req.body;
        for (let workout of workouts) {
            workout.userId = userId;
        }
        // console.log('workouts', workouts);
        if (!Array.isArray(workouts)) {
            return res.send(400).send({ 'Msg': 'Input must be an array' });
        }

        const newWorkouts = [];

        for (const workoutData of workouts) {
            // Create a new IndividualWorkout document
            const newWorkout = new IndividualWorkout({
                workoutId: workoutData.workoutId,
                userId: userId,  // Assign the userId from the route parameters
                exerciseId: workoutData.exerciseId,
                sets: workoutData.sets,
                status: "active"
            });


            // Save the new workout document to the array
            newWorkouts.push(newWorkout);
        }
        // Use $push to add the new workouts to the user's workouts array
        console.log('newWorkouts', newWorkouts)
        await existingUser.updateOne({ $push: { workouts: { $each: newWorkouts } } });
        res.status(200).send({ 'Msg': 'Workout successfuly saved' });
        // res.redirect(301, `http://localhost:5500/frontend/trackWorkout/trackWorkout.html?id=${req.body.id}`)
    } catch (error) {
        console.error('Error saving workouts', error)
        res.status(500).send('Error saving workouts')
    }

})


router.get('/workout/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('userId', userId);



    const existingUser = await RegisterUser.findById(userId)
        .populate({
            path: 'workouts',
            match: { userId: userId },
            options: { lean: true } // ToObject won't be needed with lean:true
        });
    console.log('XXXXXXXXXXXXXX', existingUser);

    /* existingUser.populate({
        path: 'workouts',
        match: { userId: userId },
        options: { lean: true },
        populate: {
            path: 'exerciseId',
            model: 'Exercise',
            select: 'name', // Specify the fields you want to select from the Exercise collection
            match: { _id: { $in: existingUser.workouts.map(workout => workout.workoutId) } }
        }
    });
    console.log(existingUser); */

    try {
        const activeWorkouts = await existingUser.workouts.filter(workout => workout.status === "active").map(workout => ({ ...workout.toObject() }));;
        console.log('activeWorkouts', activeWorkouts)

        // console.log('userWorkouts', userWorkouts);

        res.status(200).send({ "userWorkouts": activeWorkouts });
    } catch (error) {
        console.error('Error retrieving exercises', error);
        res.status(500).render('error-page');
    }
});













module.exports = router;



// POST Route zum Hinzufügen von Workouts
/* router.post('/workout', async (req, res) => {
    try {
        const newWorkoutExercise = new WorkoutExercise({
            name: req.body.name,
            type: req.body.type,
            difficulty: req.body.difficulty,
            muscle: req.body.muscle
        });
        const savedWorkoutExercise = await newWorkoutExercise.save();
        res.status(201).send(savedWorkoutExercise);
    } catch (error) {
        console.error('Error creating new workout:', error);
        res.status(400).send({ message: "Error creating new workout" });
    }
});




// Authentifizierungsrouten
//Register
/* router.post('/register', async (req, res) => {
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

router.get('/exercises', async (req, res) => {
    try {
        const exercises = await WorkoutExercise.find();
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send({ "msg": "Fehler beim Abrufen der Übungen", error: error });
    }
});

/* router.post('/exercises', (req, res) => {
    let dbResults = []
    req.body.exercises.forEach(exercise => {
        try {
            const newWorkoutExercise = new WorkoutExercise({
                name: exercise.name,
                type: exercise.type,
                difficulty: exercise.difficulty,
                muscle: exercise.muscle
            });
            dbResults.push(newWorkoutExercise.save());
        } catch (error) {
            console.error('Error creating new workout:', error);
            res.status(400).send({ message: "Error creating new workout" });
        }
    });
    Promise.all(dbResults).then(() => {
        res.status(201).send({ message: "Exercises saved" });
    });
}); */

// Authentifizierungsrouten
//Login
/* router.post('/login', async (req, res) => {
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

}) */


// POST Route zum Hinzufügen von Workouts // todo!
/* router.post('/workout', (req, res) => {
    let dbResults = []
    req.body.exercises.forEach(exercise => {
        try {
            const newWorkoutExercise = new WorkoutExercise({
                name: exercise.name,
                type: exercise.type,
                difficulty: exercise.difficulty,
                muscle: exercise.muscle
            });
            dbResults.push(newWorkoutExercise.save());
        }
catch (error) {
            console.error('Error creating new workout:', error);
            res.status(400).send({ message: "Error creating new workout" });
        }
    });
    Promise.all(dbResults).then(() => {
        res.status(201).send({ message: "Exercises saved" });
    });
});

 */

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







// Statistikrouten
// Trainingsplan-Routen


