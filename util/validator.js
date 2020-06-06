const { check, param } = require("express-validator");

/**
 * This files represents the validation process
 */

exports.createRoadmap = [
  check("title", "title is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("description", "description is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("tags", "tags is required").not().isEmpty({ ignore_whitespace: true }),
];

exports.getRoadmap = [
  param("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.getPath = [
  param("pathId", "path id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.deletePath = [
  param("pathId", "path id is required")
    .isString()
    .not()
    .isEmpty({ ignore_whitespace: true }),
  param("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.createPath = [
  check("title", "title is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("description", "description is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("links", "links are not valid").exists({
    checkFalsy: true,
  }),
  check("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.updatePath = [];
