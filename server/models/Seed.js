const mongoose = require("mongoose");

const seedSchema = new mongoose.Schema({
  common_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Seed = mongoose.model("Seed", seedSchema);

module.exports = { Seed, seedSchema };
