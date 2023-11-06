const express = require("express");
const router = express.Router();
const memCache = require("memory-cache");

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();

// Set a value in the cache with a key and a TTL (Time to Live) in milliseconds
// nodeCache.set("key", "value", 60000); // Cache will expire after 1 minute (60000 milliseconds)

// Get a value from the cache using the key
// console.log(cachedValue); // Output: value

// //////////////////////////////////

// Define routes for users
router.get("/check", (req, res) => {
  const cachedValue = nodeCache.get("key");
  // Handle GET request for users
  const keyExists = cachedValue !== null && cachedValue !== undefined;

  if (keyExists) {
    console.log(keyExists); // Output: true
    res.send("node-cache found" + cachedValue);
  } else {
    res.send("node-cache not found : " + cachedValue);
  }
});

router.get("/create", (req, res) => {
  // Handle POST request for users
  nodeCache.set("key", "value", 60000);
  res.send("Create a new cache");
});

// Export the router
module.exports = router;
