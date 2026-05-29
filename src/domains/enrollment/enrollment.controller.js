const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { formatValidationErrors } = require("../../utils/validations");

const CreateEnrollmentUseCase = require("./usecases/create-enrollment.usecase");
const UpdateEnrollmentUseCase = require("./usecases/update-enrollment.usecase");
const DeleteEnrollmentUseCase = require("./usecases/delete-enrollment.usecase");
const ListUserEnrollmentsUseCase = require("./usecases/list-user-enrollments.usecase");

const CreateEnrollmentDTO = require("./dto/create-enrollment.dto");
const UpdateEnrollmentDTO = require("./dto/update-enrollment.dto");
const EnrollmentResponseDTO = require("./dto/enrollment-response.dto");
const UserEnrollmentListResponseDTO = require("./dto/user-enrollment-list-response.dto");

class EnrollmentController {
  constructor(manager) {
    this.manager = manager;
  }

  create = async (req, res, next) => {
    try {
      const dto = plainToInstance(CreateEnrollmentDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid enrollment data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new CreateEnrollmentUseCase(this.manager);
      const enrollment = await usecase.execute(dto);
      res.status(201).json(new EnrollmentResponseDTO(enrollment));
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = plainToInstance(UpdateEnrollmentDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid enrollment data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new UpdateEnrollmentUseCase(this.manager);
      const enrollment = await usecase.execute(req.params.id, dto);

      if (!enrollment)
        return res.status(404).json({ message: "Enrollment not found" });
      res.json(new EnrollmentResponseDTO(enrollment));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const usecase = new DeleteEnrollmentUseCase(this.manager);
      const deleted = await usecase.execute(req.params.id);

      if (!deleted)
        return res.status(404).json({ message: "Enrollment not found" });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  listUserEnrollments = async (req, res, next) => {
    try {
      const { page, limit } = req.pagination;
      const { id } = req.params;

      const usecase = new ListUserEnrollmentsUseCase(this.manager);
      const [enrollments, total] = await usecase.execute(
        id,
        page,
        limit,
        req.filters,
      );

      res.json(
        new UserEnrollmentListResponseDTO(enrollments, {
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
}

module.exports = EnrollmentController;
