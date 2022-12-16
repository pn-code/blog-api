const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: { type: String, minLength: 3, maxLength: 20, required: true },
    text: { type: String, minLength: 3, maxLength: 200, required: true },
    date: { type: Date, required: true },
})

module.exports = mongoose.model("Post", PostSchema, "blogPosts");