const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, Required:true, unique: true},
    role:{type:String,required:true,default:"NORMAL"}
},{timestamps:true});

module.exports = userSchema;

const User = mongoose.model("User", userSchema);

module.exports = User;