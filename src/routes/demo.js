const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
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

router.post('/', (req, res) => {
  // Handle POST request for users
  res.send('Create a new user');
});


module.exports = router;