const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // URLs des images
});

module.exports = mongoose.model("Category", categorySchema);
