// DOTENV
require("dotenv").config();

// EXPRESS
const express = require("express");
const app = express();

// BODY PARSER
const bodyParser = require("body-parser");

// MONGOOSE
const mongoose = require("mongoose");
const { User, userSchema } = require("./models/User");
const { Seed, seedSchema } = require("./models/Seed");

// ROUTES
const userRoutes = require("./routes/user-routes");
const seedRoutes = require("./routes/seed-routes");

// BODY PARSER
app.use(express.json());

// CORS
// Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that
// allows a server to indicate any origins (domain, scheme, or port) other than
// its own from which a browser should permit loading resources.
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

// ROUTE FILTERS
app.use("/api/users", userRoutes); // Add a filter to all user routes "/api/users" + route path from userRoutes
app.use("/api/seeds", seedRoutes); // Add a filter to all user routes "/api/seeds" + route path from seedRoutes

// SERVER
const start = async () => {
  const { ATLAS_URI } = process.env;
  try {
    await mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }

  //   // Dummy Seeds
  //   const seed1 = new Seed({
  //     common_name: "testing",
  //     quantity: 20,
  //   });

  //   const seed2 = new Seed({
  //     common_name: "lala",
  //     quantity: 30,
  //   });

  //   // Dummy data testing DB connection
  //   const user1 = new User({
  //     email: "sam_jasinski@live.com.au",
  //     username: "Sam",
  //     password: "test123",
  //     seeds: [seed1, seed2],
  //   });

  //   // testing save to florafiledb
  //   await user1.save();
};

start();
