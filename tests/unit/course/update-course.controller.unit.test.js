const { setupController } = require("../../test-utils/course-controller.setup");
const UpdateCourseUseCase = require("../../../src/domains/course/usecases/update-course.usecase");

describe("CourseController - UpdateCourse - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController());
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { params: { id: 1 }, body: { title: "" } };

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid course data" }),
    );
  });

  it("deve retornar 404 se curso não encontrado", async () => {
    const req = { params: { id: 1 }, body: { title: "Novo título" } };

    jest
      .spyOn(UpdateCourseUseCase.prototype, "execute")
      .mockResolvedValue(null);

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Course not found" }),
    );
  });

  it("deve atualizar curso válido e retornar 200", async () => {
    const req = { params: { id: 1 }, body: { title: "Novo título" } };

    jest
      .spyOn(UpdateCourseUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, title: "Novo título" });

    await controller.update(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, title: "Novo título" }),
    );
  });
});
