function pagination(req, res, next) {
  const { page, limit } = req.query;
  req.pagination = {
    page: parseInt(page) > 0 ? parseInt(page) : 1,
    limit:
      parseInt(limit) > 0
        ? parseInt(limit) > 100
          ? 100
          : parseInt(limit)
        : 10,
  };
  next();
}

module.exports = pagination;
