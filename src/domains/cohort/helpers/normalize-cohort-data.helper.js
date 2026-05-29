function normalizeCohortData(data) {
  const { course_id, ...rest } = data;
  return course_id ? { ...rest, course: { id: course_id } } : rest;
}

module.exports = { normalizeCohortData };
