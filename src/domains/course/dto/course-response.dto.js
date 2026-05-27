class CourseResponseDTO {
  constructor(course) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.themes = course.themes;
    this.image_url = course.image_url;
    this.created_at = course.created_at;
    this.updated_at = course.updated_at;
  }
}
module.exports = CourseResponseDTO;
