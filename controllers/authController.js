const User = require("../models/User");

// npm i jsonwebtoken crypto-js

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    location: req.body.location,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  //     const newUser = new User(req.body); but we need to encrypt the password also. so didnt use this

  try {
    await newUser.save();
    res.status(201).json({ mssg: "User successfully created" });
  } catch (error) {
    res.status(500).json({ mssg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email }); //simple mongodb

    if (!oldUser) {
      return res.status(401).json("Wrong email");
    }

    const decryptedPassward = CryptoJS.AES.decrypt(
      oldUser.password,
      process.env.SECRET
    );
    const decryptedPass = decryptedPassward.toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== req.body.password) {
      return res.status(401).json("Wrong password");
    }

    const userToken = jwt.sign(
      {
        id: oldUser.id,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    const { password, __v, createdAt, updatedAt, ...userData } = oldUser._doc;
    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.log("error in login =>", error); // needed, I'm professional, not expert
    res.status(500).json({ mssg: "error" });
  }
};
module.exports = {
  createUser,
  loginUser,
};
