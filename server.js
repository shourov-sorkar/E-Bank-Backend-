const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const { database } = require("./src/config/database");
const path = require("path");
// View Engine Setup
const app = express();

app.use(fileUpload());
app.use(cors());

try {
  connect(database, () => {
    console.log("Database Connected");
  });
} catch (err) {
  console.log("Database Connection Error", err);
}

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileRoute = require("./src/routes/file.routes");

app.use("/file", fileRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/view/serverRunning.html"));
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is Running on " + port);
});
