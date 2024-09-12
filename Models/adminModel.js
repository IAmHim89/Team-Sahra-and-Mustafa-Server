//! Admin Model Schema
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("admin", AdminSchema);
