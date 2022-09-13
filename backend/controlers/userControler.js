import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("generate token", generateToken().exp);
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const nameRegex = /^([a-z A-Z]+)$/;
  const regexEmail = /^([a-z 0-9 \. _-]+)@([a-z]+).([a-z]{2,6})(.[a-z]{2,6})$/;
  const phoneRegex = /^([0-9]+)$/;
  const passwordRegex = /^([a-z A-Z 0-9 \. @ $ % _ -]+)$/;

  const validName = nameRegex.test(name);
  const validEmail = regexEmail.test(email);
  const validPhone = phoneRegex.test(phone);
  const validPassword = passwordRegex.test(password);
  const userExist = await User.findOne({ email });

  if (name === "" || email === "" || phone === "" || password === "") {
    return res.status(400).json({
      message: {
        name: !name
          ? "name is required"
          : !validName
          ? "enter valid name"
          : false,
        email: !email
          ? "email is required"
          : !validEmail
          ? "(e.g)  john@example.com"
          : userExist
          ? "user already exist"
          : false,
        phone: !phone
          ? "phone is required"
          : !validPhone
          ? "phone should be a number"
          : phone.length < 11
          ? "number should be atleat 11 charachters"
          : phone.length > 11
          ? "numbet should be less than 11"
          : false,
        password: !password
          ? "password is required"
          : !validPassword
          ? "password shold not contain // || ` "
          : password.length < 8
          ? "password should at least 8 character"
          : false,
      },
    });
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.inAdmin,
      token: generateToken(user._id),
      // exp: generateToken().exp,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.inAdmin,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, authUser, getUserProfile, updateUserProfile };
