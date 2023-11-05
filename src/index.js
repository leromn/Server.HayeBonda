require("./config/database.js").connect();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const server = http.createServer(app);
const demoRoutes = require("./routes/demo");
const homeRoutes = require("./routes/home");
const uploadRoute = require("./routes/upload");
const testRoute = require("./routes/test.js"); //

app.use("/appendDemo", demoRoutes);
app.use("/home", homeRoutes);
app.use("/upload", uploadRoute);
app.use("/test", testRoute);

server.listen(8000, () => {
  console.log("server started");
});
