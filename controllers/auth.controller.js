const Users = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;

    const userExist = await Users.findOne({ email: payload.email });

    if (userExist) {
      return res
        .status(400)
        .send({ message: "User already exist with the given Email Id" });
    }
    const hashedValue = bcrypt.hashSync(payload.password, 10);
    payload.hashedPassword = hashedValue;
    delete payload.password;
    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ message: "User Registered Successfully", data: data });
      })
      .catch((err) => {
        res.status(400).send({
          message: "error while registering user",
          error: err.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email: email });
    if (!userExist) {
      return res
        .status(404)
        .send({ message: "User does not exist with given email" });
    }
    const isMatch = bcrypt.compareSync(password, userExist.hashedPassword);
    if (isMatch) {
      const token = await jwt.sign(
        { _id: userExist._id },
        process.env.SECRET_KEY
      );
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 86400000),
      });
      res.status(200).send({ message: "Login Successful", user: userExist });
    } else {
      return res.status(400).send({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await Users.findById({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }
    res.status(200).send({ message: "User found", user: user });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};
