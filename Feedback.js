const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    gender: String,
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);