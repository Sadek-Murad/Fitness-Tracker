const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

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
    isNewUser: { type: Boolean, default: true }

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

const individualWorkoutSchema = new mongoose.Schema({
    userId: String,
    exerciseId: String,
    sets: Number,
}, { timestamps: true });

const IndividualWorkout = mongoose.model('IndividualWorkout', individualWorkoutSchema);

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


module.exports = { IndividualWorkout, RegisterUser, Exercise, Statistic };

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
