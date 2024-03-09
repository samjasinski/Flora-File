//REMEMBER: A filter exists in server.js for these routes e.g. "/api/users"

// MONGOOSE
const mongoose = require("mongoose");

//MODELS
const { User, userSchema } = require("../models/User");
const { Seed, seedSchema } = require("../models/Seed");

// EXPRESS
const express = require("express");
const router = express.Router();

// ROUTES
router.post("/add", async (req, res) => {
  const formData = req.body.formData;
  // comes as string, must be parsed to JSON
  const userData = JSON.parse(req.body.userData);

  // creating the need seed based on the form data
  const newSeed = new Seed({
    common_name: formData.common_name,
    quantity: formData.quantity,
  });

  User.findOneAndUpdate(
    { _id: userData.user._id },
    { $push: { seeds: newSeed } }
  )
    .then((user) => {
      res.send({
        message: { success: "Your seeds have been stored" },
      });
    })
    .catch((error) => {
      res.send({
        message: { error: "Something went wrong..." },
      });
      console.error(error);
    });
});

router.get("/display/:uid", async (req, res) => {
  console.log(req.params.uid);
  User.findById(req.params.uid).then((user) => {
    res.send(user.seeds);
  });
});

module.exports = router;
