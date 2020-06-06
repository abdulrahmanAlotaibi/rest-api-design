const Roadmap = require("../models/Roadmap");
const Path = require("../models/Path");
const { validationResult } = require("express-validator");

// FIXME: title are duplicated!
exports.createRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  try {
    const tags = req.body.tags.split(",");

    const newRoadmap = new Roadmap({
      title: req.body.title,
      description: req.body.description,
      tags: tags,
    });

    const roadmap = await newRoadmap.save();

    res.status(201).json({
      status: "success",
      message: "roadmap has been created",
      data: roadmap,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.getRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }
  const roadmapId = req.params.roadmapId;

  try {
    const roadmap = await Roadmap.findById(roadmapId).lean();

    res.status(200).json({
      status: "success",
      message: "roadmap has been retrieved",
      data: roadmap,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.getAllRoadmaps = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  try {
    const roadmaps = await Roadmap.find();

    res.status(200).json({
      status: "success",
      message: "roadmaps has been retrieved",
      data: roadmaps,
    });
  } catch (err) {
    console.err(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.deleteRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  const roadmapId = req.params.roadmapId;
  console.log(">>",roadmapId)
  try {
    const roadmap = await Roadmap.deleteOne({ _id: roadmapId }).lean();

    await Path.deleteMany({ roadmapId: roadmapId }).lean();
    
    res.status(204).json({
      status: "success",
      message: "Roadmap has been deleted",
      data: roadmap,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  const roadmapId = req.params.roadmapId;

  const properties = req.body.properties;
  console.log(properties);
  try {
    const roadmap = await Roadmap.updateOne(
      { _id: roadmapId },
      { $set: properties }
    )
      .lean()
      .exec();

    res.status(200).json({
      status: "success",
      message: "The roadmap has been updated",
      data: roadmap,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Roadmap not found",
    });
  }
};
