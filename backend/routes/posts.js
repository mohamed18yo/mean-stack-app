var express = require("express");


var contMtd= require('../controller/post')

var auth = require("../middleware/check-auth");
var multer= require('../middleware/check-file')
var router = express.Router();



router.post("", auth, multer, contMtd.addPost);

router.get("", contMtd.getPost);

router.delete("/:id", auth, contMtd.deletePost);
router.put("/:id", auth, contMtd.editPost);

module.exports = router;
