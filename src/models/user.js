import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique: true},
    userID: {type: String, required: true, unique: true},
    password1: {type: String, required: true},
    userName: {type: String, required: true},
    location: String
})

userSchema.pre("save", async function() {
    console.log("user password : ", this.password1);
    this.password1 = await bcrypt.hash(this.password1, 5)
    console.log("hashed password : ", this.password1);
})

const user = mongoose.model('user', userSchema)
export default user;