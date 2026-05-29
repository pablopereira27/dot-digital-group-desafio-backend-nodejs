const { setupController } = require("../../test-utils/controller.setup");
const CohortController = require("../../../src/domains/cohort/cohort.controller");
const DeleteCohortUseCase = require("../../../src/domains/cohort/usecases/delete-cohort.usecase");

describe("CohortController - DeleteCohort - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(CohortController));
  });

  it("deve retornar 404 se a turma não for encontrada", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteCohortUseCase.prototype, "execute")
      .mockResolvedValue(false);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Cohort not found" }),
    );
  });

  it("deve deletar a turma e retornar 204", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteCohortUseCase.prototype, "execute")
      .mockResolvedValue(true);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
