function getLink(page, limit, filters = {}) {
  const params = new URLSearchParams({ page, limit });

  for (const [key, value] of Object.entries(filters)) {
    Array.isArray(value)
      ? value.forEach((v) => params.append(key, String(v)))
      : params.append(key, String(value));
  }

  return `/courses?${params.toString()}`;
}

class CourseListResponseDTO {
  constructor(courses, { page, limit, total, filters }) {
    this.data = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      themes: course.themes,
      image_url: course.image_url,
      created_at: course.created_at,
      updated_at: course.updated_at,
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

module.exports = CourseListResponseDTO;
