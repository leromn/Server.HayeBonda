require("./config/database.js").connect();
const Product = require("./models/product").Product;
const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var cors = require("cors");

var app = express();
app.use(cors());

const server = http.createServer(app);

const NodeCache = require("node-cache");
const myCache = new NodeCache();

obj = { name: "Alexander", age: 42 };
data = myCache.set("key", obj, 20000);

app.get("/", async (req, res) => {
  const certpath = path.join(__dirname, "/images/"); //must use absoulute path instead of relative

  var pr1 = await Product.create({
    productName: "Pone",
    productDescription:
      "the first ever product posted on the online market server made for haye bonda",
    price: 15,
    thumbnail: {
      imageData: fs.readFileSync(certpath + "one.jpg"),
      imageType: "jpg",
    },

    detailImages: [
      {
        imageData: fs.readFileSync(certpath + "two.jpg"),
        imageType: "jpg",
      },
      {
        imageData: fs.readFileSync(certpath + "two.jpg"),
        imageType: "jpg",
      },
      {
        imageData: fs.readFileSync(certpath + "two.jpg"),
        imageType: "jpg",
      },
    ],
  });
  res.json({ products: "added" });
});

app.get("/popular", (req, res) => {
  res.json({ products: "items" });
});

app.post("/api/upload", upload.array("images"), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const images = req.files;

  console.log(req.files);
  res.status(200).json({ message: "Form data received successfully" });
});
server.listen(8000, () => {
  console.log("server started");
});
