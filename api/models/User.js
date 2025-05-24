const mongoose = require("mongoose"); // import mongoose

const UserSchema = new mongoose.Schema({    // define user schema
    username: {type: String, required: true}, // user name
    email: {type: String, required: true, unique: true}, // user email
    password: {type: String, required: true} // hashed password
}, {timestamps: true}); // add createdAt/updatedAt

const UserModel = mongoose.model("User", UserSchema); // create model
module.exports = UserModel; // export model