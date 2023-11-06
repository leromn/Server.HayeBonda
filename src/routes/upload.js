const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Product = require("../models/product").Product;

router.post("/", upload.array("images"), async (req, res) => {
  const name = req.body.productName;
  const description = req.body.productDescription;
  const price = req.body.price;
  console.log("/upload reached");

  var imageBuffersArray = [];
  req.files.forEach((file) => {
    imageBuffersArray.push(file.filename);
    // console.log("Fieldname:", file.fieldname);
    // console.log("Originalname:", file.originalname);
    // console.log("Encoding:", file.encoding);
    // console.log("Mimetype:", file.mimetype);
    // console.log("Size:", file.size);
    // console.log("Destination:", file.destination);
    // console.log("Filename:", file.filename);
    // console.log("Path:", file.path);
    // console.log("Buffer:", file.buffer);
    // console.log("------------------------");
  });
  const uploadsFolderPath = path.resolve(__dirname, "../../uploads"); //must use absoulute path instead of relative

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
  console.log("product uploaded");
  res.status(200).json({ product: "uploaded to the database" });
});
// Export the router
module.exports = router;
