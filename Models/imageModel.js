const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  myFile: {
    type: String,
  },
});

module.exports = mongoose.model("image", imageSchema);
