const mongoose = require("mongoose");


const dogSchema = new mongoose.Schema(
  {
    Dog_name: String,
    Origin: String,
    Fur: String,
    Height: Number,
    Color: String,
    Longevity: Number,
    Traits: String,
    Health_Problems: String,

    fur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fur Color",
    },
    Origin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country of Origin",
    },

  },
  { timestamps: true }
);

dogSchema.index({'$**': 'text'});
module.exports = mongoose.model("Dogs", dogSchema);