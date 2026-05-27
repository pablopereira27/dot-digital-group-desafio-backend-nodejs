const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/courses", (req, res) => {
  res.send(["Curso 1", "Curso 2", "Curso 3"]);
});

router.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Detalhes do Curso ${id}`);
});


module.exports = router;
