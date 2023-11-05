const express = require("express");
const router = express.Router();
const Product = require("../models/product").Product;

const NodeCache = require("node-cache");
const cache = new NodeCache();

// Define routes for users
router.get("/popular", async (req, res) => {
  var cacheId = "popular";
  console.log("popular route contacted");
  const cachedFile = cache.get(cacheId);
  if (cachedFile) {
    console.log("File found in cache");
    res.json({ products: cachedFile });
  } else {
    console.log("File not found in cache");
    // Fetch the file from the database
    await Product.find({},{ projection: { detailImages: 0} })
      .limit(2)
      .then((items) => {
        res.json({ products: items });
      })
      .then((items) => {
        cache.set(cacheId, items);
        console.log("File added to cache");
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }
});

router.get("/recent", async (req, res) => {
  var tempProducstCont = [];
  await Product.find()
    .limit(2)
    .then((items) => {
      tempProducstCont = items;
      // console.log("Fetched items:", items);
      items.forEach((item) => console.log(item.productName));
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
  res.json({ products: tempProducstCont });
});
// Export the router
module.exports = router;
