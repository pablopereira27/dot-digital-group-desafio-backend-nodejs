const express = require("express");
const router = express.Router();

const courseRoutes = require("./course.routes");

router.use("/courses", courseRoutes);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
