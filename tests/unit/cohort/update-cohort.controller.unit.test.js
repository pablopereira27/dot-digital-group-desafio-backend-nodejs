const { setupController } = require("../../test-utils/controller.setup");
const CohortController = require("../../../src/domains/cohort/cohort.controller");
const UpdateCohortUseCase = require("../../../src/domains/cohort/usecases/update-cohort.usecase");

describe("CohortController - UpdateCohort - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(CohortController));
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { params: { id: 1 }, body: { title: "" } };

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid cohort data" }),
    );
  });

  it("deve retornar 404 se turma não encontrada", async () => {
    const req = { params: { id: 1 }, body: { title: "Novo título" } };

    jest
      .spyOn(UpdateCohortUseCase.prototype, "execute")
      .mockResolvedValue(null);

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Cohort not found" }),
    );
  });

  it("deve atualizar turma válida e retornar 200", async () => {
    const req = { params: { id: 1 }, body: { title: "Novo título" } };

    jest
      .spyOn(UpdateCohortUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, title: "Novo título" });

    await controller.update(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, title: "Novo título" }),
    );
  });
});
