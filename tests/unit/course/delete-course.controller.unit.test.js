const { setupController } = require("../../test-utils/controller.setup");
const CourseController = require("../../../src/domains/course/course.controller");
const DeleteCourseUseCase = require("../../../src/domains/course/usecases/delete-course.usecase");

describe("CourseController - DeleteCourse - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(CourseController));
  });

  it("deve retornar 404 se o curso não for encontrado", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteCourseUseCase.prototype, "execute")
      .mockResolvedValue(false);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Course not found" }),
    );
  });

  it("deve deletar o curso e retornar 204", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteCourseUseCase.prototype, "execute")
      .mockResolvedValue(true);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
