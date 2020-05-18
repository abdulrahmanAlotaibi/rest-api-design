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
router.post(
  "/:roadmapId/paths",
  validator.createPath,
  roadmapController.createPath
);

// @route   DELETE api/v1/roadmaps/:roadmapId/:pathTitle
// @desc    Delete a path
// @access  Private
router.delete(
  "/:roadmapId/paths/:pathTitle",
  validator.deletePath,
  roadmapController.deletePath
);

// @route   GET api/v1/roadmaps/:roadmapId/paths
// @desc    Get all paths
// @access  Public
router.get("/:roadmapId/paths/", roadmapController.getAllPaths);

// @route   GET api/v1/roadmaps/:roadmapId/paths
// @desc    Get all paths
// @access  Private
router.delete("/:roadmapId/paths/", roadmapController.deleteRoadmap);

// @route   PATCH api/v1/roadmaps/:roadmapId
// @desc    Update partially a roadmap
// @access  Private
router.patch("/:roadmapId/paths/", roadmapController.updateRoadmap);


module.exports = router;
