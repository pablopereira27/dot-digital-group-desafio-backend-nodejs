function getLink(url, page, limit, filters = {}) {
  const params = new URLSearchParams({ page, limit });

  for (const [key, value] of Object.entries(filters)) {
    Array.isArray(value)
      ? value.forEach((v) => params.append(key, String(v)))
      : params.append(key, String(value));
  }

  return `${url}?${params.toString()}`;
}

function getHATEOSPaginationLinks(basePath, pagination, filters) {
  const { page, limit, total } = pagination;

  return {
    first: getLink(basePath, 1, limit, filters),
    self: getLink(basePath, page, limit, filters),
    next:
      page * limit < total ? getLink(basePath, page + 1, limit, filters) : null,
    prev: page > 1 ? getLink(basePath, page - 1, limit, filters) : null,
    last: getLink(basePath, Math.ceil(total / limit), limit, filters),
  };
}

function buildHateoasLinks(
  basePath,
  params = { id, pagination: {}, filters: {} },
  actions = ["self", "list", "create", "update", "delete"],
) {
  const links = [];

  if (actions.includes("self")) {
    links.push({
      rel: "self",
      method: "GET",
      href: `${basePath}/${params.id}`,
    });
  }
  if (actions.includes("list")) {
    links.push({ rel: "list", method: "GET", href: `${basePath}` });
  }
  if (actions.includes("create")) {
    links.push({ rel: "create", method: "POST", href: `${basePath}` });
  }
  if (actions.includes("update")) {
    links.push({
      rel: "update",
      method: "PUT",
      href: `${basePath}/${params.id}`,
    });
  }
  if (actions.includes("delete")) {
    links.push({
      rel: "delete",
      method: "DELETE",
      href: `${basePath}/${params.id}`,
    });
  }
  if (actions.includes("pagination")) {
    const paginationLinks = Object.entries(
      getHATEOSPaginationLinks(basePath, params.pagination, params.filters),
    );

    paginationLinks.forEach((link) => {
      if (link[1]) {
        links.push({ rel: link[0], method: "GET", href: link[1] });
      }
    });
  }

  return links;
}

module.exports = { buildHateoasLinks };
