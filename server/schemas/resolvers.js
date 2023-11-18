const { User, Product, Cart, Games, Favorites } = require("../models");
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
        try {
          const order = await Cart.findById(_id).populate({
            path: "items.product",
            model: "Product",
          });

          if (!order) {
            throw new Error("Orden no encontrada");
          }
          return order;
        } catch (error) {
          console.error(error);
          throw new Error("Error al recuperar la orden");
        }
      }
      throw new Error("Autenticación requerida");
    },
    userOrders: async (_, __, context) => {
      if (!context.user) {
        throw new Error("Autenticación requerida");
      }

      try {
        const user = await User.findById(context.user._id).populate({
          path: "orders",
          populate: {
            path: "items.product",
            model: "Product",
          },
        });
        console.log(user);
        return user.orders;
      } catch (error) {
        throw new Error("Error al obtener las órdenes del usuario");
      }
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
    addOrder: async (_, { items, total }, context) => {
      if (context.user) {
        // Crear la orden
        const order = await Cart.create({
          user: context.user._id,
          items: items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
          total: total,
          isPaid: false,
        });

        console.log(order);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order._id },
        });

        const populatedOrder = await Cart.findById(order._id).populate({
          path: "items.product",
          model: "Product",
        });
        console.log(populatedOrder);

        return populatedOrder;
      }
      throw new AuthenticationError("Not Authenticated");
    },
    addtoFavorites: async (_, { _id }, context) => {
      if (context.user) {
        // Encontrar el producto a añadir
        const productToAdd = await Product.findById(_id);
        if (!productToAdd) {
          throw new Error("Product not found");
        }

        // Obtener o crear el objeto de favoritos del usuario
        let favorite = await Favorites.findOne({ user: context.user._id });
        if (!favorite) {
          favorite = await Favorites.create({
            user: context.user._id,
            products: [],
          });
          await User.findByIdAndUpdate(context.user._id, {
            wishlist: favorite._id,
          });
        }

        // Añadir el producto a los favoritos si aún no está presente
        if (!favorite.products.includes(_id)) {
          favorite.products.push(_id);
          await favorite.save();
        }

        return productToAdd;
      }
      throw new AuthenticationError("Not Authenticated");

      // if (context.user) {
      //   let flag = false;

      //   const gameToAdd = await Product.findById(_id);

      //   const checkRepetition = await User.findById(context.user._id);

      //   checkRepetition.wishlist.map((el) => {
      //     if (el.name === gameToAdd.name) {
      //       flag = true;
      //     }
      //   });

      //   if (!flag) {
      //     await User.findByIdAndUpdate(context.user._id, {
      //       $push: { wishlist: gameToAdd },
      //     });
      //     return gameToAdd;
      //   }
      //   throw AuthenticationError;
      // }
      // throw AuthenticationError;
    },
  },
  // ... add other resolvers ...
};

module.exports = resolvers;
