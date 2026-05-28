const express = require("express");
const CourseController = require('../domains/course/course.controller');

function createCourseRoutes(manager) {
  const router = express.Router();
  const controller = new CourseController(manager);

  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
module.exports = createCourseRoutes;
