import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection // connect to mongodb

const handleOpen = () => console.log("✅ Connected to mongoDB");
const handleError = (error) => console.log("❌ DB Error : ", error)

db.on("error", handleError)
db.once("open", handleOpen)