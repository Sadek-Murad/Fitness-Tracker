const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    title: String,
    description: String,
    image: String 
})

const UserProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    email: String,
})

const Workout = mongoose.model('Workout', workoutSchema);
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);


const workouts = [
    { title: 'Morning Yoga', description: 'A relaxing start to your day', image: 'yoga.jpg' },
    { title: 'Cardio Blast', description: 'High intensity cardio', image: 'cardio.jpg' }
];



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


module.exports = {Workout, UserProfile};