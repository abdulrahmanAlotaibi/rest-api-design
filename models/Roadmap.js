const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoadmapSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  paths: [
    {
      path: {
        type: Schema.Types.ObjectId,
        ref: "path",
      },
    },
  ],
});

module.exports = Roadmap = mongoose.model("roadmap", RoadmapSchema);
