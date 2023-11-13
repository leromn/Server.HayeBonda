const express = require("express");
const router = express.Router();
const Product_Top = require("../models/product").Product_Top;
const Product_Pant = require("../models/product").Product_Pant;
const Product_Dress = require("../models/product").Product_Dress;
const Product_All = require("../models/product").Product_All;

const NodeCache = require("node-cache");
const cache = new NodeCache();

// Define routes for users
router.get("/popular", async (req, res) => {
  console.log("popular route contacted");

  const pageNumber = req.query.page;
  const clothType = req.query.type;

  var Product = null;
  if (clothType == "all") {
    Product = Product_All;
  } else if (clothType == "top") {
    Product = Product_Top;
  } else if (clothType == "pant") {
    Product = Product_Pant;
  } else if (clothType == "dress") {
    Product = Product_Dress;
  }
  var itemsPerPage = 3;
  var cacheId = "popular" + pageNumber;
  const cachedFile = cache.get(cacheId);

  if (cachedFile) {
    console.log("File found in cache");
    res.json({ products: cachedFile });
  } else {
    console.log("File not found in cache");
    // Fetch the file from the database
    await Product.find({}, "-detailImages") //remember this  projection method others dont work
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .then((items) => {
        // console.log(pageNumber + " page items sent");
        res.json({ products: items }, { type: clothType });
      })
      .then((items) => {
        cache.set(cacheId, items, function (err, success) {
          if (!err && success) {
            console.log("successfully added products to cache added  to cache");
          }
        });
      })

      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }
});

router.get("/getProduct", async (req, res) => {
  var clothType = req.query.type;
  var productId = req.query.productId;

  var Product = null;
  if (clothType == "all") {
    Product = Product_All;
  } else if (clothType == "top") {
    Product = Product_Top;
  } else if (clothType == "pant") {
    Product = Product_Pant;
  } else if (clothType == "dress") {
    Product = Product_Dress;
  }
  await Product.find({ _id: productId })
    .then((item) => {
      res.json({ product: item });
      console.log(
        "Item found and sent to client" +
          "type=" +
          clothType +
          "id= " +
          productId,
        item[0],
      );
      return;
    })
    .catch((err) => {
      console.log("item not found " + err);
    });
});

// Export the router
module.exports = router;
