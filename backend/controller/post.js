var Post = require("../model/post");




exports.getPost = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: documents,
    });
  });
};

exports.addPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  //  const post = req.body
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  console.log(post);
  post.save().then((result) => {
    res.status(201).json({
      postId: result._id,
      message: "Post Added Succesfully",
    });
  });
};

exports.deletePost = (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    //  console.log(result);
    res.status(200).json({ message: "post deleted" });
  });
};

exports.editPost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
  });
  res.status(200).json({
    message: "post updated!",
  });
};
