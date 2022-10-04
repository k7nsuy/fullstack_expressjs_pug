import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String, //
    description: String,
    createdAt: {type:Date, required:true }, // 해당 데이터 형식을 필수적으로 Date가 되어야 한다.
    hashtags: [{type: String}],
    meta: {
        views: Number,
        rating: Number
    }
})

const video = mongoose.model("video", videoSchema)
export default video
