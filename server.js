const express = require("express");
const mongoose = require("mongoose");
// Added compression and morgan
const compression = require("compression");
const logger = require("morgan");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets up developer view of logger
app.use(logger("dev"));
// enables compression
app.use(compression());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
