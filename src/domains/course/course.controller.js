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
const CourseListResponseDTO = require("./dto/course-list-response.dto");

class CourseController {
  constructor(manager) {
    this.manager = manager;
  }

  create = async (req, res, next) => {
    try {
      const dto = plainToInstance(CreateCourseDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid course data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new CreateCourseUseCase(this.manager);
      const course = await usecase.execute(dto);
      res.status(201).json(new CourseResponseDTO(course));
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const { page, limit } = req.pagination;

      const usecase = new ListCoursesUseCase(this.manager);
      const [courses, total] = await usecase.execute(page, limit, req.filters);

      res.json(
        new CourseListResponseDTO(courses, {
          page,
          limit,
          total,
          filters: req.filters,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  get = async (req, res, next) => {
    try {
      const usecase = new GetCourseUseCase(this.manager);
      const course = await usecase.execute(req.params.id);

      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(new CourseResponseDTO(course));
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = plainToInstance(UpdateCourseDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid course data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new UpdateCourseUseCase(this.manager);
      const course = await usecase.execute(req.params.id, dto);

      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(new CourseResponseDTO(course));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const usecase = new DeleteCourseUseCase(this.manager);
      const deleted = await usecase.execute(req.params.id);

      if (!deleted)
        return res.status(404).json({ message: "Course not found" });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CourseController;
