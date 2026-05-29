class CohortResponseDTO {
  constructor(cohort) {
    Object.assign(this, {
      id: cohort.id,
      title: cohort.title,
      description: cohort.description,
      vacancies: cohort.vacancies,
      status: cohort.status,
      start_date: cohort.start_date,
      end_date: cohort.end_date,
      created_at: cohort.created_at,
      updated_at: cohort.updated_at,
      course_id: cohort.course?.id,
    });
  }
}
module.exports = CohortResponseDTO;
