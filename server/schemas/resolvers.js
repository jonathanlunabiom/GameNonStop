const { User, Product, Category, Cart, Favorites } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
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
      // .populate({
      //   path: "category.name",
      //   populate: "product",
      // });
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
        const order = await Cart.create({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }
      throw AuthenticationError;
    },
    addtoFavorites: async (_, game, context) => {
      if (context.user) {
        const createFav = await Favorites.create(game);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { wishlist: createFav },
        });
        return createFav;
      }
      throw AuthenticationError;
    },
  },
  // ... add other resolvers ...
};

module.exports = resolvers;
