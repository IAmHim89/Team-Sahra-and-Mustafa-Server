//!initialize dotenv
require("dotenv").config();

const express = require("express");

const app = express();

const cors = require("cors");

app.use(express.json());

//?Import mongoose
const mongoose = require("mongoose");

//connection url variable
const MONGODB = process.env.MONGO_URL + process.env.MONGO_NAME;

//connection middleware for mongoose
mongoose.connect(MONGODB);

//store to connection status
const db = mongoose.connection;

const PORT = process.env.MYPORT || 8080;

//Eventlistener to check connection
db.once("open", async () => {
  console.log("*".repeat(10));
  console.log(`Succesfully Connected: \n ${MONGODB}`);
  console.log("*".repeat(10));
});

app.listen(PORT, () => {
  console.log(`Local Server Running On PORT: ${PORT}`);
});
