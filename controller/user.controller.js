const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSignUp = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 2, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(403).json({ msg: err });
      }
      const userData = new userModel({ ...req.body, password: hash });
      await userData.save();
      res.status(201).json({ msg: "successfully register" });
    });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await userModel.findOne({ email });
    if (getUser) {
      bcrypt.compare(password, getUser.password, function (err, result) {
        if (result) {
          res.status(201).json({
            msg: "login successfully",
            token: jwt.sign({ name: getUser.email }, process.env.SECRET_KEY),
          });
        } else {
          res.status(400).json({ msg: "wrong credential" });
        }
      });
    } else {
      res.status(400).json({ msg: "wrong credential" });
    }
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};

module.exports = { userLogin, userSignUp };
