const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: { type: String, minlength: 3, maxlength: 20, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    phone: { type: String, match: /^[0-9]{9,16}$/, required: true },
});

module.exports = mongoose.model("User", userSchema);