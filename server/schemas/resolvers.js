const { User, Product, Cart, Games } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profile: async (_, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw AuthenticationError;
    },
    order: async (_, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.cartProducts",
          populate: "category",
        });
        return user.orders.id(_id);
      }
      throw AuthenticationError;
    },
    products: async () => {
      return await Product.find();
    },
    product: async (_, { _id }) => {
      return await Product.findById(_id);
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

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = await signToken(user);

      return { token, user };
    },
    addOrder: async (_, { products }, context) => {
      if (context.user) {
        const order = await Cart.create(products);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }
      throw AuthenticationError;
    },
    addtoFavorites: async (_, { _id }, context) => {
      if (context.user) {
        let flag = false;

        const gameToAdd = await Product.findById(_id);
        const checkRepetition = await User.findById(context.user._id);
        checkRepetition.wishlist.map((el) => {
          if (el.name === gameToAdd.name) {
            flag = true;
          }
        });
        if (!flag) {
          await User.findByIdAndUpdate(context.user._id, {
            $push: { wishlist: gameToAdd },
          });
          return gameToAdd;
        }
        throw AuthenticationError;
      }
      throw AuthenticationError;
    },
    
  },
  // ... add other resolvers ...
};

module.exports = resolvers;
