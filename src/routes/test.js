const express = require("express");
const router = express.Router();

// Define routes for users
router.get("/", (req, res) => {
  // Handle GET request for users
  res.send("Get all users");
});

router.post("/", (req, res) => {
  // Handle POST request for users
  res.send("Create a new user");
});

// Export the router
module.exports = router;
