const { ThemesEnum } = require("../../src/domains/course/enums/themes.enum");

const courseData = {
  title: "Curso de JavaScript",
  description: "Aprenda JavaScript do básico ao avançado",
  themes: Object.values(ThemesEnum).slice(0, 2),
  image_url: "https://example.com/course-image.jpg",
};

module.exports = { courseData };
