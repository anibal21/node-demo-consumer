import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  objectID: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String
  },
  deleted: {
    type: Boolean
  },
  created_at: {
    type: Number
  },
  author: {
    type: String
  },
  url: {
    type: String
  }
});

const Post = mongoose.model("posts", postSchema);

export default Post;
