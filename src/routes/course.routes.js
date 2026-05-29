const express = require("express");
const CourseController = require('../domains/course/course.controller');

const pagination = require("../middlewares/pagination.middleware");
const queryFiltersSanitize = require("../middlewares/query-filters-sanitize.middleware");

function createCourseRoutes(manager) {
  const router = express.Router();
  const controller = new CourseController(manager);

  router.get("/", [pagination, queryFiltersSanitize], controller.list);
  router.post("/", controller.create);
  router.get("/:id", controller.get);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
module.exports = createCourseRoutes;
