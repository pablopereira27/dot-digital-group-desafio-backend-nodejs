const express = require("express");
const UserController = require("../domains/user/user.controller");
const EnrollmentController = require("../domains/enrollment/enrollment.controller");

const pagination = require("../middlewares/pagination.middleware");
const queryFiltersSanitize = require("../middlewares/query-filters-sanitize.middleware");

function createUserRoutes(manager) {
  const router = express.Router();
  const controller = new UserController(manager);
  const enrollmentController = new EnrollmentController(manager);

  router.get("/", [pagination, queryFiltersSanitize], controller.list);
  router.post("/", controller.create);
  router.get("/:id", controller.get);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.remove);
  router.get("/:id/courses", [pagination, queryFiltersSanitize], enrollmentController.listUserEnrollments);

  return router;
}

module.exports = createUserRoutes;
