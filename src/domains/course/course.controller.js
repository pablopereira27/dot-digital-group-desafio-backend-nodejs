const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { formatValidationErrors } = require("../../utils/validations");

const CreateCourseUseCase = require("./usecases/create-course.usecase");
const ListCoursesUseCase = require("./usecases/list-courses.usecase");
const GetCourseUseCase = require("./usecases/get-course.usecase");
const UpdateCourseUseCase = require("./usecases/update-course.usecase");
const DeleteCourseUseCase = require("./usecases/delete-course.usecase");

const CreateCourseDTO = require("./dto/create-course.dto");
const UpdateCourseDTO = require("./dto/update-course.dto");
const CourseResponseDTO = require("./dto/course-response.dto");

module.exports = {
  async create(req, res) {
    const dto = plainToInstance(CreateCourseDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Invalid course data",
        errors: formatValidationErrors(errors),
      });
    }

    const usecase = new CreateCourseUseCase();
    const course = await usecase.execute(dto);
    res.status(201).json(new CourseResponseDTO(course));
  },

  async list(req, res) {
    const usecase = new ListCoursesUseCase();
    const courses = await usecase.execute();
    res.json(courses.map((course) => new CourseResponseDTO(course)));
  },

  async get(req, res) {
    const usecase = new GetCourseUseCase();
    const course = await usecase.execute(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(new CourseResponseDTO(course));
  },

  async update(req, res) {
    const dto = plainToInstance(UpdateCourseDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Invalid course data",
        errors: formatValidationErrors(errors),
      });
    }

    const usecase = new UpdateCourseUseCase();
    const course = await usecase.execute(req.params.id, dto);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(new CourseResponseDTO(course));
  },

  async remove(req, res) {
    const usecase = new DeleteCourseUseCase();
    const deleted = await usecase.execute(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.status(204).send();
  },
};
