const express = require("express");
const router = express.Router();
const validator = require("../util/validator");
const roadmapController = require("../controllers/roadmapController");

// @route   POST api/v1/roadmaps
// @desc    Create a roadmap
// @access  Private
router.post("/", validator.createRoadmap, roadmapController.createRoadmap);

// @route   GET api/v1/roadmaps/:roadmapId
// @desc    Get a roadmap
// @access  Private
router.get("/:roadmapId/", validator.getRoadmap, roadmapController.getRoadmap);

// @route   GET api/v1/roadmaps
// @desc    Get all roadmaps
// @access  Public
router.get("/", roadmapController.getAllRoadmaps);

// @route   DELETE api/v1/roadmaps/:roadmapId/paths
// @desc    Delete a rodamap
// @access  Private
router.delete("/:roadmapId/", roadmapController.deleteRoadmap);

// @route   PATCH api/v1/roadmaps/:roadmapId
// @desc    Update partially a roadmap
// @access  Private
router.patch("/:roadmapId/", roadmapController.updateRoadmap);

module.exports = router;
