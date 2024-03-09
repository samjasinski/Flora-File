//REMEMBER: A filter exists in server.js for these routes e.g. "/api/users"

// MONGOOSE
const mongoose = require("mongoose");

//MODELS
const { User, userSchema } = require("../models/User");
const { Seed, seedSchema } = require("../models/Seed");

// EXPRESS
const express = require("express");
const router = express.Router();

// BCRYPT
const bcrypt = require("bcryptjs");

// JSON WEB TOKEN
const jwt = require("jsonwebtoken");

//ROUTES
router.post("/register", async (req, res) => {
  const { username, email, password, errors } = req.body.formData;

  User.findOne({ email: email })
    .then(async (user) => {
      //console.log("User search results: ", docs);
      if (user) {
        // send error message back to app and tell the user that that email already exists
        res.send({ message: { error: "This email is already in use!" } });
      } else {
        //register the new user details in the DB

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          email: email,
          username: username,
          password: hashedPassword,
          seeds: [],
        });
        await newUser.save();

        const token = jwt.sign(
          { userId: newUser.id, email: newUser.email },
          // will need to replace with a DOVENV variable at some stage
          "supersecretstring",
          { expiresIn: "1h" }
        );

        res.send({
          message: { error: "", success: "A new user has been created" },
          token: token,
          user: newUser.toObject(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  const { username, email, password, errors } = req.body.formData;

  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        console.log("user exists");
        // check if entered password matches
        // will eventually encrypt
        console.log("checking password matches");
        passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          console.log("MATCH!");
          // password is a match, send message to front end to log them in!

          const token = jwt.sign(
            { userId: user.id, email: user.email },
            // will need to replace with a DOVENV variable at some stage
            "supersecretstring",
            { expiresIn: "1h" }
          );

          res.send({
            token: token,
            // probably shouldnt send all the user data back..
            user: user.toObject(),
            errors: { password: "", email: "" },
          });
        } else {
          console.log("does not match..");
          // send a password does not match error
          res.send({
            errors: {
              password: "The password entered did not match our records..",
              email: "",
            },
          });
        }
      } else {
        console.log("User does not exist");
        //send a message saying the user does not exist in the DB
        res.send({
          errors: {
            password: "",
            email: "That email address does not exist in our database...",
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
