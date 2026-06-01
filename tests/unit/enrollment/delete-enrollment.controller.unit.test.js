const { setupController } = require("../../test-utils/controller.setup");
const EnrollmentController = require("../../../src/domains/enrollment/enrollment.controller");
const DeleteEnrollmentUseCase = require("../../../src/domains/enrollment/usecases/delete-enrollment.usecase");

describe("EnrollmentController - DeleteEnrollment - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(EnrollmentController));
  });

  it("deve retornar 404 se matrícula não encontrada", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteEnrollmentUseCase.prototype, "execute")
      .mockResolvedValue(false);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Enrollment not found" }),
    );
  });

  it("deve deletar matrícula e retornar 204", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteEnrollmentUseCase.prototype, "execute")
      .mockResolvedValue(true);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
