import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxLength: 80}, //
    description: {type: String, required: true, trim: true, minLength: 20},
    createdAt: {type:Date, required:true }, // 해당 데이터 형식을 필수적으로 Date가 되어야 한다.
    hashtags: [{type: String}],
    meta: {
        rating: { type: Number, default:0, required: true},
        views:  { type: Number, default:0, required: true}
    }
})

videoSchema.pre("save", async function() {
    console.log("we are about save this", this)
    this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startWith("#") ? word : `#${word}`))
})

const video = mongoose.model("video", videoSchema)

export default video
