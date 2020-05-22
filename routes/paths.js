const express = require("express");
const router = express.Router();
const pathController = require("../controllers/pathController");
const validator = require("../util/validator");

// @route   POST api/v1/roadmaps/:roadmapTitle/
// @desc    Create a path inside a roadmap
// @access  Private
router.post("", validator.createPath, pathController.createPath);

// @route   GET api/v1/roadmaps/:pathId
// @desc    Get a path
// @access  Private TODO: Edit this in v2.0
router.get("/pathId", validator.getPath, pathController.getPath);

// @route   GET api/v1/roadmaps
// @desc    Get all paths
// @access  Public
router.get("/", pathController.getAllPaths);

// @route   DELETE api/v1/roadmaps/:roadmapId/:pathTitle
// @desc    Delete a path
// @access  Private
router.delete("/:pathId", validator.deletePath, pathController.deletePath);

// @route   PATCH api/v1/roadmaps/:pathId
// @desc    Update a path
// @access  Private TODO: Edit this in v2.0
router.patch("/:pathId", validator.updatePath, pathController.updatePath);

module.exports = router;
