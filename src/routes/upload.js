const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Product_Top = require("../models/product").Product_Top;
const Product_Pant = require("../models/product").Product_Pant;
const Product_Dress = require("../models/product").Product_Dress;
const Product_All = require("../models/product").Product_All;

router.post("/", upload.array("images"), async (req, res) => {
  const clothType = req.body.type;
  const name = req.body.productName;
  const description = req.body.productDescription;
  const price = req.body.price;
  const color = req.body.color;

  console.log("/upload reached");

  var imageBuffersArray = [];
  req.files.forEach((file) => {
    imageBuffersArray.push(file.filename);
  });
  const uploadsFolderPath = path.resolve(__dirname, "../../uploads"); //must use absoulute path instead of relative

  const createProduct = async (clothType) => {
    var Product = null;
    if (clothType == "top") {
      //save to itself and save to all without the images
      Product = Product_Top;
    } else if (clothType == "pant") {
      Product = Product_Pant;
    } else if (clothType == "dress") {
      Product = Product_Dress;
    }

    var pr0 = await Product_All.create({
      productName: name,
      productDescription: description,
      price: price,
      thumbnail: {
        imageData: fs.readFileSync(
          uploadsFolderPath + "/" + imageBuffersArray[0],
        ),
        imageType: "jpg",
      },
      productColor: color,
      productId: clothType + Date.now,
      detailImages: [],
    });
    var pr1 = await Product.create({
      productName: name,
      productDescription: description,
      price: price,
      thumbnail: {
        imageData: fs.readFileSync(
          uploadsFolderPath + "/" + imageBuffersArray[0],
        ),
        imageType: "jpg",
      },

      detailImages: [
        {
          imageData: fs.readFileSync(
            uploadsFolderPath + "/" + imageBuffersArray[1],
          ),
          imageType: "jpg",
        },
        {
          imageData: fs.readFileSync(
            uploadsFolderPath + "/" + imageBuffersArray[2],
          ),
          imageType: "jpg",
        },
        {
          imageData: fs.readFileSync(
            uploadsFolderPath + "/" + imageBuffersArray[3],
          ),
          imageType: "jpg",
        },
      ],
    });
  };

  console.log("product uploaded");
  res.status(200).json({ product: "uploaded to the database" });
});
// Export the router
module.exports = router;
