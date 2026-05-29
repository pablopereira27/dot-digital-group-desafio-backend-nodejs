const express = require("express");
const EnrollmentController = require("../domains/enrollment/enrollment.controller");

function createEnrollmentRoutes(manager) {
  const router = express.Router();
  const controller = new EnrollmentController(manager);

  router.post("/", controller.create);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}

module.exports = createEnrollmentRoutes;
