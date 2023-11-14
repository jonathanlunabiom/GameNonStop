const { User, Product, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
  },
  Mutation: {
    register: async (_, args) => {
      // Registration logic...
      try {
        // Check if a user already exists with the given email
        const userToRegister = await User.findOne({
          email: args.email,
        });

        if (userToRegister) {
          throw new Error("Email already in use");
        }

        // Create a new user with the hashed password
        const user = await User.create(args);

        // Create a JWT token for the new user
        const token = signToken(user);

        // Return the auth payload (including the JWT token and user information)
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      console.log(user);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      console.log(correctPw);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = await signToken(user);

      return { token, user };
    },
  },
  // ... add other resolvers ...
};

module.exports = resolvers;
