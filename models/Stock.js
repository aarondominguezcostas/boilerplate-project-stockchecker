const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// model that represents the assets 
let stock = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {     
      type: [String]
    }
  }
);

module.exports = mongoose.model("Stock", stock);