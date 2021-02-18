const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.login = (req, res, next) => {
  let userfetch;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) { 
        return res.status(401).json({
          message: "User Not Found",
        });
      }
      userfetch = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token = jwt.sign(
        { email: userfetch.email, userId: userfetch._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      // console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth fiald",
      });
    });
};
