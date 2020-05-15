const Roadmap = require("../models/Roadmap");
const Path = require("../models/Path");
const { validationResult } = require("express-validator");

exports.createRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const newRoadmap = new Roadmap({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    });

    const roadmap = await newRoadmap.save();

    res.json({
      status: "success",
      data: roadmap,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getAllRoadmaps = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const roadmaps = await Roadmap.find();

    res.status(200).json({
      status: "success",
      data: roadmaps,
    });
  } catch (err) {
    console.err(err);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.createPath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const { title, description, levels, links } = req.body;

    const roadmapId = req.params.roadmapId;

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      throw Error("roadmap not found");
    }
    const path = new Path({
      title: title,
      description: description,
      levels: levels,
      links: links,
      roadmapTitle: roadmap.title,
      roadmapId: roadmapId,
    });

    await path.save();

    // MongoDB will track changes, add the path to the roadmap
    roadmap.paths = [...roadmap.paths, path._id];

    await roadmap.save();

    res.status(200).json({
      status: "success",
      data: path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deletePath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const { roadmapId, pathTitle } = req.params;
  console.log(roadmapId);
  try {
    const path = await Path.findOne({ title: pathTitle });

    await path.remove();

    const roadmap = await Roadmap.findById(roadmapId);

    roadmap.paths = roadmap.paths.filter((p) => p.title === pathTitle);

    roadmap.save();

    res.json({
      status: "success",
      message: "Path has been deleted",
      data: path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};


// TODO: GetAllPaths()