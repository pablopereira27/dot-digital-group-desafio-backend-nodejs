const { setupController } = require("../../test-utils/controller.setup");
const EnrollmentController = require("../../../src/domains/enrollment/enrollment.controller");
const UpdateEnrollmentUseCase = require("../../../src/domains/enrollment/usecases/update-enrollment.usecase");

describe("EnrollmentController - UpdateEnrollment - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(EnrollmentController));
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { params: { id: 1 }, body: { status: "" } };

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid enrollment data" }),
    );
  });

  it("deve retornar 404 se matrícula não encontrada", async () => {
    const req = { params: { id: 1 }, body: { status: "trancado" } };

    jest
      .spyOn(UpdateEnrollmentUseCase.prototype, "execute")
      .mockResolvedValue(null);

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Enrollment not found" }),
    );
  });

  it("deve atualizar matrícula válida e retornar 200", async () => {
    const req = { params: { id: 1 }, body: { status: "trancado" } };

    jest
      .spyOn(UpdateEnrollmentUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, status: "trancado" });

    await controller.update(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, status: "trancado" }),
    );
  });
});
