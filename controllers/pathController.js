const Roadmap = require("../models/Roadmap");
const Path = require("../models/Path");
const { validationResult } = require("express-validator");

/*
- FIXME: req.params: undefined -> maybe because the the use route in server.js
- TODO: key duplication in the validation
*/
exports.createPath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  try {
    const { title, description, links, roadmapId } = req.body;

    const roadmap = await Roadmap.findById(roadmapId);

    const path = new Path({
      title: title,
      description: description,
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
      message: "path has been created",
      data: path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.getPath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }
  const pathId = req.params.pathId;

  try {
    const path = await Path.findById(pathId).lean();

    res.status(200).json({
      status: "success",
      message: "path has been retrieved",
      data: path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

exports.getAllPaths = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  try {
    const { roadmapId } = req.query;
    console.log(roadmapId);
    const allPaths = await Path.find({ roadmapId: roadmapId }).lean();

    res.status(200).json({
      status: "success",
      message: "Paths has been retrieved",
      data: allPaths,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updatePath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  const pathId = req.params.pathId;

  const properties = req.body.properties;

  try {
    const path = await Path.updateOne({ _id: pathId }, { $set: properties })
      .lean()
      .exec();

    res.status(200).json({
      status: "success",
      message: "The path has been updated",
      data: path,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "path not found",
    });
  }
};

exports.deletePath = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "failed",
      errors: errors.array(),
    });
  }

  const { roadmapId, pathId } = req.params;

  try {
    const roadmap = await Roadmap.findById(roadmapId);

    const path = await Path.findById(pathId);

    roadmap.paths = roadmap.paths.filter((p) => p._id === pathId);

    // Parallal Requests
    await Promise.all([path.remove(), roadmap.save()]);

    res.status(204).json({
      status: "success",
      message: "path has been deleted",
      data: path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
