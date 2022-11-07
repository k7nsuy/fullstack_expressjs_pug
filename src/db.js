import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/wetube")

const db = mongoose.connection // connect to mongodb

const handleOpen = () => console.log("✅ Connected to mongoDB");
const handleError = (error) => console.log("❌ DB Error : ", error)
db.on("error", handleError)
db.once("open", handleOpen)