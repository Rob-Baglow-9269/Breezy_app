const mongoose = require('mongoose'); 
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register user function
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Register user request:', { username, email, password });

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    console.log('Existing user check result:', existingUser);
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ username, email, password });
    console.log('New user created:', user);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user function
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user function
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user function
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.deleteOne({ _id: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
