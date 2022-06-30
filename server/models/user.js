const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    totalScore: {
        type: Number,
        default: 0
    }
});