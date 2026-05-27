class CreateCourseDTO {
  constructor({ title, description, themes, image_url }) {
    this.title = title;
    this.description = description;
    this.themes = themes;
    this.image_url = image_url;
  }
}
module.exports = CreateCourseDTO;
