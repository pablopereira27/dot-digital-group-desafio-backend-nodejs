class CourseResponseDTO {
  constructor(course) {
    Object.assign(this, {
      id: course.id,
      title: course.title,
      description: course.description,
      themes: course.themes,
      image_url: course.image_url,
      created_at: course.created_at,
      updated_at: course.updated_at,
    });
  }
}
module.exports = CourseResponseDTO;
