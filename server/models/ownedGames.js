const mongoose = require("mongoose");

const { Schema } = mongoose;

const gamesSchema = new Schema({
  ownedGames: [
    {
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
    },
  ],
});

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
