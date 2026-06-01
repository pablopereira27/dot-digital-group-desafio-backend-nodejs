const { setupController } = require("../../test-utils/controller.setup");
const { BusinessRuleError } = require("../../../src/errors");
const EnrollmentController = require("../../../src/domains/enrollment/enrollment.controller");
const CreateEnrollmentUseCase = require("../../../src/domains/enrollment/usecases/create-enrollment.usecase");

describe("EnrollmentController - CreateEnrollment - Unit", () => {
  let controller, res, next;
  const enrollmentData = { user_id: 1, cohort_id: 99 };

  beforeEach(() => {
    ({ controller, res, next, managerMock } =
      setupController(EnrollmentController));
  });

  it("deve repassar BusinessRuleError para o error handler global", async () => {
    const req = { body: enrollmentData };
    const error = new BusinessRuleError("Turma não disponível para matrícula");
    
    jest
      .spyOn(CreateEnrollmentUseCase.prototype, "execute")
      .mockRejectedValue(error);

    await controller.create(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve criar usuário válido e retornar 201", async () => {
    const req = { body: enrollmentData };

    jest
      .spyOn(CreateEnrollmentUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, ...req.body, status: "ativo" });

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: "ativo" }),
    );
  });
});
