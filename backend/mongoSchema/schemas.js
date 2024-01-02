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



module.exports = {workoutSchema};