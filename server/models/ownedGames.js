const mongoose = require("mongoose");

const { Schema } = mongoose;

const gamesSchema = new Schema({
  ownedGames: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
