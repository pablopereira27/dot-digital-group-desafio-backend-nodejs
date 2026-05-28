function getLink(page, limit, filters = {}) {
  const params = new URLSearchParams({ page, limit });

  for (const [key, value] of Object.entries(filters)) {
    Array.isArray(value)
      ? value.forEach((v) => params.append(key, String(v)))
      : params.append(key, String(value));
  }

  return `/cohorts?${params.toString()}`;
}

class CohortListResponseDTO {
  constructor(cohorts, { page, limit, total, filters }) {
    this.data = cohorts.map((cohort) => ({
      id: cohort.id,
      title: cohort.title,
      description: cohort.description,
      vacancies: cohort.vacancies,
      status: cohort.status,
      start_date: cohort.start_date,
      end_date: cohort.end_date,
      created_at: cohort.created_at,
      updated_at: cohort.updated_at,
    }));

    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };

    this.filters = filters;

    this.links = {
      self: getLink(page, limit, filters),
      next: page * limit < total ? getLink(page + 1, limit, filters) : null,
      prev: page > 1 ? getLink(page - 1, limit, filters) : null,
    };
  }
}

module.exports = CohortListResponseDTO;
