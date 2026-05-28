function formatValidationErrors(errors) {
  return errors.reduce((acc, err) => {
    acc[err.property] = Object.values(err.constraints);
    return acc;
  }, {});
}

module.exports = { formatValidationErrors };
