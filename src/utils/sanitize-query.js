function sanitizeQuery(query) {
  const clean = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // remove strings vazias do array
      const filtered = value
        .map((v) => (typeof v === "string" ? v.trim().toLowerCase() : v))
        .filter((v) => v !== "");

      if (filtered.length > 0) {
        clean[key.toLowerCase()] = filtered;
      }
    } else if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized !== "") {
        clean[key.toLowerCase()] = normalized;
      }
    } else {
      clean[key.toLowerCase()] = value;
    }
  }

  return clean;
}

module.exports = { sanitizeQuery };
