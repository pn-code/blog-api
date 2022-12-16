const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    name: { type: String, minLength: 3, maxLength: 20, required: true },
    text: { type: String, minLength: 3, maxLength: 200, required: true },
    date: { type: Date, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }
})

module.exports = mongoose.model("Comment", CommentSchema, "blogComments");