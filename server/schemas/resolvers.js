const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      // Registration logic...
      try {
        // Check if a user already exists with the given email
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
          throw new Error('Email already in use');
        }

        // Hash password with bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds is 10

        // Create a new user with the hashed password
        const newUser = new User({
          username: username.trim(),
          email: email.toLowerCase().trim(), // Ensure email is in lowercase for uniqueness constraints
          password: hashedPassword,
        });

        // Save the new user to the database
        const result = await newUser.save();

        // Create a JWT token for the new user
        const token = jwt.sign(
          { userId: result.id, email: result.email },
          process.env.JWT_SECRET, // Use the secret from your environment variables
          { expiresIn: '1h' } // Token expires in one hour
        );

        // Return the auth payload (including the JWT token and user information)
        return {
          token: token,
          user: result,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    login: async (_, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
    },
  },
  // ... add other resolvers ...
};