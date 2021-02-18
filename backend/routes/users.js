var express = require("express");


var contMetd= require('../controller/user')

var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/signup", contMetd.signup );

router.post("/login",contMetd.login );
module.exports = router;
