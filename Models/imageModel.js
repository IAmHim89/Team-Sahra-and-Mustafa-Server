const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  myFile: {
    type: Object,
  },
});

module.exports = mongoose.model("image", imageSchema);
