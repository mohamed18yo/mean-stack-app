const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
  title: String,
  content: String,
  imagePath:String
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post
