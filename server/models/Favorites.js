const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
