var express = require("express");

var multer = require("multer");
var Post = require("../model/post");
var auth = require('../middleware/check-auth')
var router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storge = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",auth,
  multer({ storge: storge }).single("image"),
  (req, res, next) => {
    // const post = req.body
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    console.log(req.body);
    post.save().then((result) => {
      res.status(201).json({
        postId: result._id,
        message: "Post Added Succesfully",
      });
    });
  }
);

router.get("", (req, res) => {
const pageSize= +req.query.pagesize
const currentPage= +req.query.page
const postQuery= Post.find()
if(pageSize&& currentPage){
  postQuery.skip(pageSize *(currentPage-1)).limit(pageSize)
}
postQuery.then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: documents,
    });
  });
  //  [
  //   { id: '45656dagsg4', title: 'First Post from node.js', content: 'hello world' },
  //   { id: '55dgshdb', title: 'Scend Post from node.js', content: 'hello world' },
  //   { id: '456sd56dagsg4', title: 'Third Post from node.js', content: 'hello world' },
  //   { id: '456wef56dagsg4', title: 'Fourth Post from node.js', content: 'hello world' }
  // ]

  //
});

router.delete("/:id",auth, (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    //  console.log(result);
    res.status(200).json({ message: "post deleted" });
  });
});
router.put("/:id",auth, (req, res, next) => {
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
});

module.exports = router;
