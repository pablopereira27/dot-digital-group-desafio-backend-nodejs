const CreateCourseUseCase = require("./usecases/create-course.usecase");
const ListCoursesUseCase = require("./usecases/list-courses.usecase");
const GetCourseUseCase = require("./usecases/get-course.usecase");
const UpdateCourseUseCase = require("./usecases/update-course.usecase");
const DeleteCourseUseCase = require("./usecases/delete-course.usecase");

module.exports = {
  async create(req, res) {
    const usecase = new CreateCourseUseCase();
    const course = await usecase.execute(req.body);
    res.status(201).json(course);
  },

  async list(req, res) {
    const usecase = new ListCoursesUseCase();
    const courses = await usecase.execute();
    res.json(courses);
  },

  async get(req, res) {
    const usecase = new GetCourseUseCase();
    const course = await usecase.execute(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  },

  async update(req, res) {
    const usecase = new UpdateCourseUseCase();
    const course = await usecase.execute(req.params.id, req.body);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  },

  async remove(req, res) {
    const usecase = new DeleteCourseUseCase();
    const deleted = await usecase.execute(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.status(204).send();
  },
};
