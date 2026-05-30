function mergeData(defaultData, data) {
  const merged = { ...defaultData };

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined || value === "") {
      delete merged[key];
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

module.exports = { mergeData };
