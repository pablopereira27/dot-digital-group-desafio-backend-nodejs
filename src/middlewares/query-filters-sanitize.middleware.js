const { sanitizeQuery } = require("../utils/sanitize-query");

function queryFiltersSanitize(req, res, next) {
  const { page, limit, ...filters } = req.query;
  req.filters = sanitizeQuery(filters);
  next();
}

module.exports = queryFiltersSanitize;
