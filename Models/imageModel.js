const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: String,
  required: true,
  myFile: String,
});

Module.exports = mongoose.model("image", imageSchema);
