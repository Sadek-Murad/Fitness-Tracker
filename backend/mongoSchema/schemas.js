const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
})

// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


const RegisterUser = mongoose.model("User", userSchema)


const workoutSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: String,
    description: String,
    image: String
})

const Workout = mongoose.model('Workout', workoutSchema);


const individualWorkoutSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    exerciseId: String,
    sets: Number,
}, { timestamps: true })

const individualWorkout = mongoose.model('individualWorkout', individualWorkoutSchema);


const exercisesSchema = new mongoose.Schema({
    name: String,
    type: String,
    difficulty: String,
    muscle: String
})

const WorkoutExercise = mongoose.model('exercises', exercisesSchema);

/* const userProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisterUser' },
    firstname: String,
    lastname: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    email: String,
}) */

/* 
const UserProfile = mongoose.model('UserProfile', userProfileSchema); */




module.exports = { Workout, individualWorkout, WorkoutExercise, RegisterUser };


/* const workouts = [
    { title: 'Morning Yoga', description: 'A relaxing start to your day', image: 'yoga.jpg' },
    { title: 'Cardio Blast', description: 'High intensity cardio', image: 'cardio.jpg' }
];
 */


// Funktion zum Einfügen der Daten
/* async function insertSampleData() {
    try {
        // Workout-Daten einfügen
        for (let workout of workouts) {
            const newWorkout = new Workout(workout);
            await newWorkout.save();
        }
        console.log('Workout data inserted');

    } catch (err) {
        console.error('Error inserting sample data:', err);
    } finally {
        mongoose.disconnect();
    }
}
       

insertSampleData(); */


