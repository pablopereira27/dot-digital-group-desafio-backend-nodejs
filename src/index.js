// Configurações
require("dotenv").config();
const { AppDataSource } = require("./data-source");

const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
const routes = require("./routes");

app.use(routes);

// Inicializa o banco antes de subir o servidor
AppDataSource.initialize()
  .then(() => {
    // logger.info("O banco de dados foi inicializado!");
    console.log("O banco de dados foi inicializado!");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    // logger.fatal(
    //   { err: error },
    //   "Erro fatal: não foi possível inicializar o banco de dados",
    // );
    console.error(
      "Erro fatal: não foi possível inicializar o banco de dados",
      error,
    );
    process.exit(1);
  });
