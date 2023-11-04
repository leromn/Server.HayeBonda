require("./config/database.js").connect();
const Product = require("./models/product").Product;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const server = http.createServer(app);

const NodeCache = require("node-cache");
const myCache = new NodeCache();

obj = { name: "Alexander", age: 42 };
data = myCache.set("key", obj, 20000);

app.get("/appendDemo", async (req, res) => {
  const certpath = path.join(__dirname, "/images/"); //must use absoulute path instead of relative

  var pr1 = await Product.create({
    productName: "Phone",
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

app.get("/popular", async (req, res) => {
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

app.post("/upload", upload.array("images"), async (req, res) => {
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
  const uploadsFolderPath = path.resolve(__dirname, "../uploads"); //must use absoulute path instead of relative

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

server.listen(8000, () => {
  console.log("server started");
});
