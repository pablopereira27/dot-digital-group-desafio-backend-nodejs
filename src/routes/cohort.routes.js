const express = require("express");
const CohortController = require("../domains/cohort/cohort.controller");

function createCohortRoutes(manager) {
  const router = express.Router();
  const controller = new CohortController(manager);

  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
module.exports = createCohortRoutes;
