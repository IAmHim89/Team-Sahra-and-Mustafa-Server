const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  myFile: String,
});

MediaSourceHandle.exports = mongoose.model("image", imageSchema);
