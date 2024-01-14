const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const individualWorkoutSchema = new mongoose.Schema({
    workoutId: String,
    userId: String,
    exerciseId: String,
    sets: Number,
    status: String
}, { timestamps: true });

const IndividualWorkout = mongoose.model('IndividualWorkout', individualWorkoutSchema);

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    profileImage: String,
    BMI: Number,
    isNewUser: { type: Boolean, default: true },
    workouts: [{ type: Schema.Types.ObjectId, ref: 'IndividualWorkout' }],
    workouts: [individualWorkoutSchema]
})

// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


const RegisterUser = mongoose.model("RegisterUser", userSchema)


const exercisesSchema = new mongoose.Schema({
    name: String,
    type: String,
    difficulty: String,
    muscle: String
})

const Exercise = mongoose.model('Exercise', exercisesSchema);

const savedWorkoutSchema = new mongoose.Schema({
    userId: String,
    weights: [],
    reps: []
})

const SavedWorkout = mongoose.model('SavedWorkout', savedWorkoutSchema);

const statisticSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisterUser' },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    performance: [{
        set: Number,
        reps: Number,
        weight: Number,
    }],
    date: { type: Date, default: Date.now }
});

const Statistic = mongoose.model('Statistic', statisticSchema);


module.exports = { IndividualWorkout, RegisterUser, Exercise, SavedWorkout, Statistic };

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
