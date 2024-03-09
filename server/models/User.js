const mongoose = require("mongoose");

const { seedSchema } = require("./Seed.js");

// a schema containing the Users data, including nested seed data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // I thought the Seed var would go here, turns out its the schema..
  seeds: [seedSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
