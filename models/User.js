const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
    match: /^[a-zA-Z0-9]+$/
},

email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
},

password: {
    type: String,
    required: true,
    minlength: 8
}
}, 
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
