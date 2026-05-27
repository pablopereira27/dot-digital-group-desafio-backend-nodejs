const express = require("express");
const controller = require("../domains/course/course.controller");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:hash", controller.get);
router.put("/:hash", controller.update);
router.delete("/:hash", controller.remove);

module.exports = router;
