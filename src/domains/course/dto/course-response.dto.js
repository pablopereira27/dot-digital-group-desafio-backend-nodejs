class CourseResponseDTO {
  constructor(course) {
    this.hash = course.hash;
    this.title = course.title;
    this.description = course.description;
    this.duration_minutes = course.duration_minutes;
    this.level = course.level;
    this.price = course.price;
    this.created_at = course.created_at;
    this.updated_at = course.updated_at;
  }
}
module.exports = CourseResponseDTO;
