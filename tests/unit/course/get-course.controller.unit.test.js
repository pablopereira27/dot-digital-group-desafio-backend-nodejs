const { setupController } = require("../../test-utils/controller.setup");
const CourseController = require("../../../src/domains/course/course.controller");
const GetCourseUseCase = require("../../../src/domains/course/usecases/get-course.usecase");

describe("CourseController - GetCourse - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(CourseController));
  });

  it("deve retornar 404 se curso não encontrado", async () => {
    const req = { params: { id: 1 } };

    jest.spyOn(GetCourseUseCase.prototype, "execute").mockResolvedValue(null);

    await controller.get(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Course not found" }),
    );
  });

  it("deve retornar curso válido", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(GetCourseUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, title: "Curso de JS" });

    await controller.get(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, title: "Curso de JS" }),
    );
  });
});
