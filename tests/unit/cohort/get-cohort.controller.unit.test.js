const { setupController } = require("../../test-utils/controller.setup");
const CohortController = require("../../../src/domains/cohort/cohort.controller");
const GetCohortUseCase = require("../../../src/domains/cohort/usecases/get-cohort.usecase");

describe("CohortController - GetCohort - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(CohortController));
  });

  it("deve retornar 404 se a turma não for encontrada", async () => {
    const req = { params: { id: 1 } };

    jest.spyOn(GetCohortUseCase.prototype, "execute").mockResolvedValue(null);

    await controller.get(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Cohort not found" }),
    );
  });

  it("deve retornar uma turma válida", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(GetCohortUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, title: "Turma de JS" });

    await controller.get(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, title: "Turma de JS" }),
    );
  });
});
