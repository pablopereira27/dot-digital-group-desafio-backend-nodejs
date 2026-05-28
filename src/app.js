// Core libraries
const express = require("express");

// Rotas
const createCourseRoutes = require("./routes/course.routes");

function createApp(manager) {
  const app = express();

  // Middlewares Globais
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rotas e Documentação
  app.use("/courses", createCourseRoutes(manager));

  // Health check
  app.get("/", (req, res) => {
    res.send(
      `${new Date().toLocaleString()} - Servidor em pleno funcionamento!`,
    );
  });

  return app;
}

module.exports = createApp;
