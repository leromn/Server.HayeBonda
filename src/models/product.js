const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: { type: String, default: null },
  productDescription: { type: String, default: null },
  price: { type: Number },
  thumbnail: {
    imageData: {
      type: Buffer,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
  },

  detailImages: [
    {
      imageData: {
        type: Buffer,
        required: true,
      },
      imageType: {
        type: String,
        required: true,
      },
    },
  ],
});

const Product = model("Product", productSchema);
module.exports.Product = Product;
