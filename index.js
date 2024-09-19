//!initialize dotenv
require("dotenv").config();
//! initialize express
const express = require("express");
//! app variable to activate express
const app = express();
//! cors variable
const cors = require("cors");
//! cors activation
app.use(
  cors({
    credentials: true,
    orign: ["http://localhost:5173"],
  })
);

//! json call
app.use(express.json());

const adminController = require("./Controllers/adminController");

app.use("/admin", adminController);

//?Import mongoose
const mongoose = require("mongoose");

//connection url variable
const MONGODB = process.env.MONGO_URL + process.env.MONGO_NAME;

//connection middleware for mongoose
mongoose.connect(MONGODB);

//store to connection status
const db = mongoose.connection;

//? hidden port connection string and alternative port connection
const PORT = process.env.MYPORT || 8080;

//!Eventlistener to check connection
db.once("open", async () => {
  console.log("*".repeat(10));
  console.log(`Succesfully Connected: \n ${MONGODB}`);
  console.log("*".repeat(10));
});
//!Server connection
app.listen(PORT, () => {
  console.log(`Local Server Running On PORT: ${PORT}`);
});
