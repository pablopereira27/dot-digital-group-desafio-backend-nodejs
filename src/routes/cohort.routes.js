const express = require("express");
const CohortController = require("../domains/cohort/cohort.controller");

const pagination = require("../middlewares/pagination.middleware");
const queryFiltersSanitize = require("../middlewares/query-filters-sanitize.middleware");

function createCohortRoutes(manager) {
  const router = express.Router();
  const controller = new CohortController(manager);

  router.get("/", [pagination, queryFiltersSanitize], controller.list);
  router.post("/", controller.create);
  router.get("/:id", controller.get);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
module.exports = createCohortRoutes;
