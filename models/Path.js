const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FIXME: Validation not working
const PathSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  links: [
    {
      name: {
        type: String,
        // required: true,
      },
      href: {
        type: String,
        // required: true,
      },
    },
  ],

  roadmapTitle: String,
  roadmapId: String,
});

module.exports = Path = mongoose.model("path", PathSchema);
