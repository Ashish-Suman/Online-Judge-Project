const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const problemSchema = new Schema({
    problemId: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    }
})