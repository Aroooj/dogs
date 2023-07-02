const mongoose = require("mongoose");


const dogSchema = new mongoose.Schema(
  {
    Dog_name: String,
    Origin: String,
    Fur: String,
    Height: String,
    Color: String,
    Longevity: String,
    Traits: String,
    Health_Problems: String,

    Fur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fur",
    },
    Origin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Origin",
    },

  },
  { timestamps: true }
);

dogSchema.index({'$**': 'text'});
module.exports = mongoose.model("Dogs", dogSchema);