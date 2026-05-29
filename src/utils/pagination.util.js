function getLink(url, page, limit, filters = {}) {
  const params = new URLSearchParams({ page, limit });

  for (const [key, value] of Object.entries(filters)) {
    Array.isArray(value)
      ? value.forEach((v) => params.append(key, String(v)))
      : params.append(key, String(value));
  }

  return `${url}?${params.toString()}`;
}

function getHATEOSLink(url, paginationParams, filters) {
  const { page, limit, total } = paginationParams;

  return {
    first: getLink(url, 1, limit, filters),
    self: getLink(url, page, limit, filters),
    next: page * limit < total ? getLink(url, page + 1, limit, filters) : null,
    prev: page > 1 ? getLink(url, page - 1, limit, filters) : null,
    last: getLink(url, Math.ceil(total / limit), limit, filters),
  };
}

function getPaginationMeta(total, page, limit) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

module.exports = { getHATEOSLink, getPaginationMeta };
