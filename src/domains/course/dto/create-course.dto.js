class CreateCourseDTO {
  constructor({ title, description, duration_minutes, level, price }) {
    this.title = title;
    this.description = description;
    this.duration_minutes = duration_minutes;
    this.level = level;
    this.price = price;
  }
}
module.exports = CreateCourseDTO;
