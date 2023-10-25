import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {password, email} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email: email,
      passwordHash: hash
    });

    await user.save();

    const jwtToken = jwt.sign(
      {
        _id: user._id,
      },
      "secretKeyForUser",
      {
        expiresIn: "30d"
      }
    );

    const {passwordHash, ...userData} = user._doc;

    res.status(201).json({
      jwtToken,
      ...userData
    });

  } catch (error) {
    res.status(500).json({
      message: "Register failed"
    })
    console.log(error.message);
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )

    if (!isPasswordValid){
      return res.status(404).json({
        message: "Wrong email or password"
      });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
      },
      "secretKeyForUser",
      {
        expiresIn: "30d"
      }
    );

    const {passwordHash, ...userData} = user._doc;

    res.status(200).json({
      jwtToken,
      ...userData
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed"
    })
    console.log(error.message);
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

    const {passwordHash, ...userData} = user._doc;

    res.status(200).json({
      ...userData
    })


  } catch (error) {
    res.status(500).json({
      message: "Data fetching failed"
    })
    console.log(error.message);
  }
}

