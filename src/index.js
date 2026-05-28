// Configurações
require("dotenv").config();

const { AppDataSource } = require("./data-source");
const createApp = require("./app");
const logger = require("./logger");

const port = process.env.APP_PORT || 3000;

// Inicializa o banco antes de subir o servidor
AppDataSource.initialize()
  .then(() => {
    logger.info("O banco de dados foi inicializado!");
    const app = createApp(AppDataSource.manager);
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  })
  .catch((error) => {
    logger.fatal(
      { err: error },
      "Erro fatal: não foi possível inicializar o banco de dados",
    );
    process.exit(1);
  });
