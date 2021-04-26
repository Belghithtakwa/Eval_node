require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", require("./router/api"));

const port = 8000;
app.listen(port, async () => {
  console.log("server is running");
});
