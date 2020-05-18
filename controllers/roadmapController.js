const Roadmap = require("../models/Roadmap");
const Path = require("../models/Path");
const { validationResult } = require("express-validator");

/**
 * TODO:  complete updatePath()
 *  FIXME: Add validation, Test methods
 */

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

    res.status(201).json({
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

  try {
    const roadmap = await Roadmap.findById(roadmapId);

    const path = await Path.remove({ title: pathTitle });

    roadmap.paths = roadmap.paths.filter((p) => p.title === pathTitle);

    // Parallal Requests
    await Promise.all([path.remove(), roadmap.save()]);

    res.status(204).json({
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

exports.getAllPaths = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const { roadmapId } = req.params;

    const allPaths = await Path.find({ roadmapId: roadmapId }).lean();

    res.status(200).json({
      status: "success",
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

exports.deleteRoadmap = async (req, res) => {
  // Bring all the errors from the validation process
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const roadmapId = req.params.roadmapId;

  try {
    const roadmap = await Roadmap.deleteOne({ _id: roadmapId }).lean();

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
      errors: errors.array(),
    });
  }
  const roadmapId = req.params.roadmapId;

  const properties = req.body.properties;

  const updatedProprties = {};

  for (const prop of properties) {
    updatedProprties[prop.name] = prop.value;
  }

  try {
    const roadmap = await Roadmap.update(
      { _id: roadmapId },
      { $set: updatedProprties }
    ).lean();

    res.status(204).json({
      status: "success",
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

// TODO updatePath()
