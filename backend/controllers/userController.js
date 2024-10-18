import User from '../models/userModel.js';
import asynchHandler from '../middleware/asyncHandler.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import createToken from '../utils/createToken.js';

const createUser = asynchHandler(async (req, res) => {
  const { username, name, email, phone, password } = req.body;

  if (!username || !name || !email || !phone || !password) {
      throw new Error('Please fill all the inputs.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
      return res.status(400).send('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, name, email, phone, password: hashedPassword });

  console.log("New User Data:", newUser);

  try {
      await newUser.validate();

      await newUser.save();

      console.log("User saved successfully");

      try {
          createToken(res, newUser._id);
      } catch (tokenError) {
          console.error("Token Error:", tokenError);
          return res.status(500).json({ message: "Token creation failed", error: tokenError.message });
      }

      res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          isAdmin: newUser.isAdmin,
          isSalesM: newUser.isSalesM, 
          isInventoryM :newUser.isInventoryM,
          isOrderM: newUser.isOrderM   
      });

  } catch (error) {
      console.error("Validation or Save Error:", error);  
      res.status(400).json({ message: "Invalid User Data", error: error.message });
  }
});

const loginUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
          createToken(res, existingUser._id);

          return res.status(200).json({
              _id: existingUser._id,
              username: existingUser.username,
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.phone,
              isAdmin: existingUser.isAdmin,
              isSalesM: existingUser.isSalesM,
              isInventoryM: existingUser.isInventoryM,
              isOrderM: existingUser.isOrderM,
          });
      } else {
          return res.status(401).json({ message: "Invalid password" });
      }
  } else {
      return res.status(404).json({ message: "User not found" });
  }
});


const logoutCurrentUser = asynchHandler (async (req, res) =>{
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
    
      res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asynchHandler (async (req, res) =>{
    const users = await User.find({})
    res.json(users);
});

const getCurrentUserProfile = asynchHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  });

const updateCurrentUserProfile = asynchHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSalesM: updatedUser.isSalesM,
        isInventoryM: updatedUser.isInventoryM,
        isOrderM: updatedUser.isOrderM
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  

export {createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile};