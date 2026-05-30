const { BusinessRuleError, NotFoundError } = require("../errors");
const logger = require("../logger");

function errorHandler(err, req, res, next) {
  if (err instanceof BusinessRuleError) {
    logger.warn(err.message);
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    logger.error(err.message);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error({ err }, "Ocorreu um Erro inesperado.");
  res.status(500).send("Erro interno do servidor.");
}

module.exports = errorHandler;
