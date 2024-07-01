const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: Email,
            required: true,
        },
    });

const USer = mongoose.model("User", UserSchema)
module.exports = USer;
