class UpdateCourseDTO {
  constructor({ title, description, duration_minutes, level, price }) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (duration_minutes !== undefined) this.duration_minutes = duration_minutes;
    if (level !== undefined) this.level = level;
    if (price !== undefined) this.price = price;
  }
}
module.exports = UpdateCourseDTO;
