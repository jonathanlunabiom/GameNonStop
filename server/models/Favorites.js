const mongoose = require("mongoose");
const { Schema } = mongoose;
const favoriteSchema = new Schema({
  name: {
    type: String,
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
});

Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
