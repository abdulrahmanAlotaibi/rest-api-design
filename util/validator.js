const { check, validationResult, param } = require("express-validator");

exports.createRoadmap = [
  check("title", "title is required").not().isEmpty(),
  check("description", "description is required").not().isEmpty(),
  check("tags", "tags is required").trim().not().isEmpty(),
];

exports.getAllRoadmaps = [
  // param("title", "title is required").not().isEmpty().trim(),
];

exports.createPath = [
  check("title", "title is required").not().isEmpty().trim(),
  check("description", "description is required").not().isEmpty().trim(),
  check("levels", "levels are required").isArray().isLength({ min: 1 }),
  check("links", "links are not valid").isArray().isLength({ min: 1 }),
  param("roadmapId", "roadmapId is required")
    .trim()
    .exists({ checkFalsy: true }),
];

exports.deletePath = [
  param("pathTitle", "path title is required").not().isEmpty(),
];
