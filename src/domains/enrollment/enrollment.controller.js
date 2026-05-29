const ListUserEnrollmentsUseCase = require("./usecases/list-user-enrollments.usecase");

const UserEnrollmentListResponseDTO = require("./dto/user-enrollment-list-response.dto");

class EnrollmentController {
  constructor(manager) {
    this.manager = manager;
  }

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
