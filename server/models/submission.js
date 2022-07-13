const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const submissionSchema = new Schema({
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    problemName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("Submission", submissionSchema);