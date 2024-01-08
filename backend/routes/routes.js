const express = require("express")
const router = express.Router();
const { RegisterUser, WorkoutExercise } = require("../mongoSchema/schemas");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('../Auth/auth');
const session = require('express-session');
const path = require("path")



// Authentifizierungsrouten
//Google Authentifizierung starten
router.get('/auth/google', passport.authenticate('google'));


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            if (req.user.isNewUser) {
                res.redirect('http://localhost:5500/frontend/additional-info/additional-info.html?id=' + req.user._id);
            } else {
                res.redirect(`/profile/${req.user._id}`);
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
            weight: req.body.weight
        });

        res.status(301).redirect(`http://localhost:5500/frontend/profile/profile.html?id=${req.body.id}`);
    } catch (error) {
        console.error('Error updating user information:', error);
        // res.redirect('/error');
    }
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



module.exports = router;

// GET-Route für das Abrufen aller Übungen
/* router.get('/exercises', async (req, res) => {
    try {
        const exercises = await WorkoutExercise.find();
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send({ "msg": "Fehler beim Abrufen der Übungen", error: error });
    }
}); */


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
 

 */



// Authentifizierungsrouten
//Google Authentifizierung starten
// router.get('/auth/google', passport.authenticate('google'));


// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         try {
//             if (req.user.isNewUser) {
//                 res.redirect('http://localhost:3000/api/additional-info');
//             } else {
//                 res.redirect(`/profile/${req.user._id}`);
//             }
//         } catch (error) {
//             console.error('Error in authentication process:', error);
//             res.redirect('/error');
//         }
//     }
// );


// router.post('/additional-info', async (req, res) => {
//     console.log(req.body);
//     try {
//         const updatedUser = await RegisterUser.findByIdAndUpdate(req.user._id, {
//             age: req.body.age,
//             gender: req.body.gender,
//             height: req.body.height,
//             weight: req.body.weight,
//             isNewUser: false
//         }, { new: true });
//         req.user = updatedUser;
//         res.redirect(`/profile/${req.user._id}`);
//     } catch (error) {
//         console.error('Error updating user information:', error);
//         res.redirect('/error');
//     }
// });



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
});



// Profilrouten
//Get information
// router.get('/profile/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const existingUser = await RegisterUser.findById(userId);
//         if (!existingUser) {
//             return res.status(412).send({ "msg": "User not found" });
//         }
//         res.status(200).send(existingUser);
//     } catch (error) {
//         console.error("Profil retrieval failed: ", error);
//         res.status(500).send({ "Msg": "Error retrieving profile" });
//     }

// })

// // Profilrouten
// //Update the user
// router.patch('/profile/:id', async (req, res) => {
//     try {
//         const userId = req.params.id
//         const updateUser = req.body;
//         const existingUser = await RegisterUser.findByIdAndUpdate(userId, updateUser, { new: true });
//         if (!existingUser) {
//             return res.status(412).send({ "msg": "User not found" });
//         }
//         return res.status(200).send(existingUser);
//     } catch (error) {
//         console.error("Profile update failed: ", error);
//         return res.status(500).send({ "Msg": "Error updating profile" })

//     }
// })


// GET-Route für das Abrufen aller Übungen
router.get('/exercises', async (req, res) => {
    try {
        const exercises = await WorkoutExercise.find();
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send({ "msg": "Fehler beim Abrufen der Übungen", error: error });
    }
});




// //Trainingsprogramm-Routen
// router.get('/exercises', async (req, res) => {
//     try {
//         const exercises = await WorkoutExercise.find();
//         res.status(200).send(exercises);
//     } catch (error) {
//         res.status(500).send({ "msg": "Errors when practicing the exercises", error: error });
//     }
// });




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


 */





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






// Trainingsprogramm-Routen
// Statistikrouten
// Trainingsplan-Routen


// const express = require("express")
// const router = express.Router();
// const { RegisterUser, WorkoutExercise } = require("../mongoSchema/schemas");
// const mongoose = require("mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('../Auth/auth');
// const session = require('express-session');
// const path = require("path")



// // Authentifizierungsrouten
// //Google Authentifizierung starten
// router.get('/auth/google', passport.authenticate('google'));


// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     async (req, res) => {
//         try {
//             if (req.user.isNewUser) {
//                 res.redirect('http://localhost:5500/frontend/additional-info/additional-info.html');
//             } else {
//                 res.redirect(`/profile/${req.user._id}`);
//             }
//         } catch (error) {
//             console.error('Error in authentication process:', error);
//             res.redirect('/error');
//         }
//     }
// );

// router.post('/additional-info', async (req, res) => {
//     try {
//         await RegisterUser.findByIdAndUpdate(req.user._id, {
//             age: req.body.age,
//             gender: req.body.gender,
//             height: req.body.height,
//             weight: req.body.weight
//         });
//         res.redirect('/profile');
//     } catch (error) {
//         console.error('Error updating user information:', error);
//         res.redirect('/error');
//     }
// });

// router.get('/additional-info', async (req, res) => {
//     res.send(path.join(__dirname('additional-info/additional-info.html')));
// });


// // Profilrouten
// //Get information
// router.get('/profile/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const existingUser = await RegisterUser.findById(userId);
//         if (!existingUser) {
//             return res.status(412).send({ "msg": "User not found" });
//         }
//         res.status(200).send(existingUser);
//     } catch (error) {
//         console.error("Profil retrieval failed: ", error);
//         res.status(500).send({ "Msg": "Error retrieving profile" });
//     }

// })

// // Profilrouten
// //Update the user
// router.patch('/profile/:id', async (req, res) => {
//     try {
//         const userId = req.params.id
//         const updateUser = req.body;
//         const existingUser = await RegisterUser.findByIdAndUpdate(userId, updateUser, { new: true });
//         if (!existingUser) {
//             return res.status(412).send({ "msg": "User not found" });
//         }
//         return res.status(200).send(existingUser);
//     } catch (error) {
//         console.error("Profile update failed: ", error);
//         return res.status(500).send({ "Msg": "Error updating profile" })

//     }
// })

// module.exports = router;
