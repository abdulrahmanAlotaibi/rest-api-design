const { check, validationResult, param } = require("express-validator");

exports.createRoadmap = [
  check("title", "title is required").isString().not().isEmpty(),
  check("description", "description is required")
    .trim()
    .isString({ ignore_whitespace: false })
    .not()
    .isEmpty(),
  check("tags", "tags is required")
    .trim()
    .isString({ ignore_whitespace: false })
    .not()
    .isEmpty(),
];

exports.getRoadmap = [
  param("roadmapId", "roadmap id is required")
    .trim()
    .isString({ ignore_whitespace: false })
    .not()
    .isEmpty(),
];

exports.getPath = [
  param("pathId", "path id is required")
    .trim()
    .isString({ ignore_whitespace: false })
    .not()
    .isEmpty()
    .exists({ checkNull: true }),
];

exports.deletePath = [
  param("pathId", "path id is required").trim().isString().not().isEmpty(),
  param("roadmapId", "roadmap id is required")
    .isString({ ignore_whitespace: false })
    .trim()
    .not()
    .isEmpty(),
];
exports.createPath = [
  check("title", "title is required").trim().isString().not().isEmpty(),
  check("description", "description is required").trim().not().isEmpty(),
  check("levels", "levels are required").isArray().isLength({ min: 1 }),
  check("links", "links are not valid").isArray().isLength({ min: 1 }),
  param("roadmapId", "roadmap id is required")
    .isString({ ignore_whitespace: false })
    .trim()
    .not()
    .isEmpty()
    .exists({ checkFalsy: true }),
];

exports.updatePath = [
  param("pathId", "path id is required")
    .trim()
    .isString({ ignore_whitespace: false })
    .not()
    .isEmpty(),
];
