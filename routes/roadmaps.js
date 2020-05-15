const express = require("express");
const router = express.Router();

const roadmapController = require("../controllers/roadmapController");
const validator = require("../util/validator");

// @route   POST api/v1/roadmaps
// @desc    Create a roadmap
// @access  Private
router.post("/", validator.createRoadmap, roadmapController.createRoadmap);

// @route   GET api/v1/roadmaps
// @desc    Get all roadmaps
// @access  Public
router.get("/", validator.getAllRoadmaps, roadmapController.getAllRoadmaps);

// @route   POST api/v1/roadmaps/:roadmapTitle/
// @desc    Create a path inside a roadmap
// @access  Private
router.post("/:roadmapId", validator.createPath, roadmapController.createPath);

// @route   DELETE api/v1/roadmaps/:roadmapId/:pathTitle
// @desc    Delete a path
// @access  Private
router.delete(
  "/:roadmapId/:pathTitle",
  validator.deletePath,
  roadmapController.deletePath
);

module.exports = router;
