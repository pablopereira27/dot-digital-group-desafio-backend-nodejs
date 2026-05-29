const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { formatValidationErrors } = require("../../utils/validations");

const CreateCohortUseCase = require("./usecases/create-cohort.usecase");
const ListCohortsUseCase = require("./usecases/list-cohorts.usecase");
const GetCohortUseCase = require("./usecases/get-cohort.usecase");
const UpdateCohortUseCase = require("./usecases/update-cohort.usecase");
const DeleteCohortUseCase = require("./usecases/delete-cohort.usecase");

const CreateCohortDTO = require("./dto/create-cohort.dto");
const UpdateCohortDTO = require("./dto/update-cohort.dto");
const CohortResponseDTO = require("./dto/cohort-response.dto");
const CohortListResponseDTO = require("./dto/cohort-list-response.dto");

class CohortController {
  constructor(manager) {
    this.manager = manager;
  }

  create = async (req, res, next) => {
    try {
      const dto = plainToInstance(CreateCohortDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid cohort data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new CreateCohortUseCase(this.manager);
      const cohort = await usecase.execute(dto);
      res.status(201).json(new CohortResponseDTO(cohort));
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const { page, limit } = req.pagination;

      const usecase = new ListCohortsUseCase(this.manager);
      const [cohorts, total] = await usecase.execute(page, limit, req.filters);

      res.json(
        new CohortListResponseDTO(cohorts, {
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
      const usecase = new GetCohortUseCase(this.manager);
      const cohort = await usecase.execute(req.params.id);

      if (!cohort) return res.status(404).json({ message: "Cohort not found" });
      res.json(new CohortResponseDTO(cohort));
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = plainToInstance(UpdateCohortDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid cohort data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new UpdateCohortUseCase(this.manager);
      const cohort = await usecase.execute(req.params.id, dto);

      if (!cohort) return res.status(404).json({ message: "Cohort not found" });
      res.json(new CohortResponseDTO(cohort));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const usecase = new DeleteCohortUseCase(this.manager);
      const deleted = await usecase.execute(req.params.id);

      if (!deleted)
        return res.status(404).json({ message: "Cohort not found" });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CohortController;
