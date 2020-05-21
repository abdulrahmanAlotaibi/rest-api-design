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
router.get("/", roadmapController.getAllRoadmaps);

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
  "/:roadmapId/paths/:pathId",
  validator.deletePath,
  roadmapController.deletePath
);

// @route   GET api/v1/roadmaps/:roadmapId/paths
// @desc    Get all paths
// @access  Public
router.get("/:roadmapId/paths/", roadmapController.getAllPaths);

// @route   DELETE api/v1/roadmaps/:roadmapId/paths
// @desc    Delete a rodamap
// @access  Private
router.delete("/:roadmapId/", roadmapController.deleteRoadmap);

// @route   PATCH api/v1/roadmaps/:roadmapId
// @desc    Update partially a roadmap
// @access  Private
router.patch("/:roadmapId/", roadmapController.updateRoadmap);

// @route   GET api/v1/roadmaps/:roadmapId
// @desc    Get a roadmap
// @access  Private TODO: Edit this in v2.0 -> auth
router.get("/:roadmapId/", validator.getRoadmap, roadmapController.getRoadmap);

// @route   GET api/v1/roadmaps/:roadmapId/paths/:pathId
// @desc    Get a path
// @access  Private TODO: Edit this in v2.0
router.get(
  "/:roadmapId/paths/pathId",
  validator.getPath,
  roadmapController.getPath
);


// @route   PATCH api/v1/roadmaps/:roadmapId/paths/:pathId
// @desc    Update a path
// @access  Private TODO: Edit this in v2.0
router.patch(
  "/:roadmapId/paths/:pathId",
  validator.updatePath,
  roadmapController.updatePath
);


// @route   GET api/v1/roadmaps/:roadmapId/paths/:pathId
// @desc    Get a path
// @access  Private 
router.get(
  "/:roadmapId/paths/:pathId",
  validator.getPath,
  roadmapController.getPath
);

module.exports = router;
