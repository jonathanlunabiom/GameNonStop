const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  cartProducts: [
    {
      name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      category: {
        type: String,
      },
    },
  ],
  total: {
    type: Number,
  },
  isPayed: {
    type: Boolean,
    default: false
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
