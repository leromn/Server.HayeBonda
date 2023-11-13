const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: { type: String, default: null },
  productDescription: { type: String, default: null },
  price: { type: Number, default: 100 },
  rating: { type: Number, default: 5 },
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
  productId: { type: String, default: null, unique: true },
  productColor: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product_Top = model("Product_Top", productSchema);
const Product_Pant = model("Product_Pant", productSchema);
const Product_Dress = model("Product_Dress", productSchema); //they are saved on different collection for retrieval purpose
const Product_All = model("products", productSchema); //doesnot have detail images

module.exports.Product_Top = Product_Top;
module.exports.Product_Pant = Product_Pant;
module.exports.Product_Dress = Product_Dress;
module.exports.Product_All = Product_All;
