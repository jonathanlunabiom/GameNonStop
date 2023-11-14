// Import the required modules
const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Cart = require("./Order");
const Games = require("./Games");

// User schema definition using the new Schema constructor
const userSchema = new Schema(
  {
    // Define firstName field with type and validations
    firstName: {
      type: String,
      required: true, // Make this field requiered
      trim: true, // Trims whitespace from the email
    },
    // Define lastName field with type and validations
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique in the database
      trim: true,
      lowercase: true, // Converts the email to lowercase
      match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regex validation for email
    },
    password: {
      type: String,
      required: true,
      minlength: 5, // Set a minimum length for the password
      select: false, // Prevents the password from being returned in queries by default
    },
    // Define orders as an array of Cart schema references
    orders: [Cart.schema],
    // Define games as an array of Games schema references
    games: [Games.schema],
  },
  {
    // Convert documents to JSON including virtuals
    toJSON: {
      virtuals: true, // Include virtuals when document is converted to JSON
    },
    id: false, // Prevent mongoose from creating a virtual `id` field
  }
);

// Create a virtual property `gamesCount` that returns the number of games associated with the user
userSchema.virtual("gamesCount").get(function () {
  return this.games.length;
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Instance method to check if the provided password matches the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema definition
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
