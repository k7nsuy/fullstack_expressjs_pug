import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique: true},
    avatarUrl: String,
    socialOnly : {type:Boolean, default: false},
    userID: {type: String, required: true, unique: true},
    password1: {type: String},
    userName: {type: String, required: true},
    location: String,
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'video'}]
})

userSchema.pre("save", async function() {
    if(this.isModified("password1")) {
        console.log("user password : ", this.password1);
        this.password1 = await bcrypt.hash(this.password1, 5)
        console.log("hashed password : ", this.password1);
    }
})

const user = mongoose.model('user', userSchema)
export default user;