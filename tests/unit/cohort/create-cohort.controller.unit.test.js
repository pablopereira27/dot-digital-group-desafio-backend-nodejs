const { setupController } = require("../../test-utils/controller.setup");
const CohortController = require("../../../src/domains/cohort/cohort.controller");
const CreateCohortUseCase = require("../../../src/domains/cohort/usecases/create-cohort.usecase");

describe("CohortController - CreateCohort - Unit", () => {
  let controller, res, next;
  const cohortData = {
    title: "Turma de Álgebra Linear - 2026 1",
    description:
      "Turma focada em álgebra linear para estudantes de ciência da computação",
    vacancies: 30,
    status: "disponível",
    start_date: "2026-01-01",
    end_date: "2026-06-30",
  };

  beforeEach(() => {
    ({ controller, res, next, managerMock } =
      setupController(CohortController));
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { body: { title: "" } };

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid cohort data" }),
    );
  });

  it("deve criar uma turma válida e retornar 201", async () => {
    const req = {
      body: { ...cohortData, course_id: 1 },
    };

    // intercepta o método execute da classe real
    jest
      .spyOn(CreateCohortUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, ...req.body });

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(cohortData));
  });
});
