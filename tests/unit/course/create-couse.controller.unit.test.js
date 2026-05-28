const { setupController } = require("../../test-utils/course-controller.setup");
const CreateCourseUseCase = require("../../../src/domains/course/usecases/create-course.usecase");

describe("CourseController - CreateCourse - Unit", () => {
  let controller, res, next;
  const courseData = {
    title: "Curso de JS",
    description: "Aprenda JS",
    themes: ["tecnologia"],
    image_url: "https://example.com/img.jpg",
  };

  beforeEach(() => {
    ({ controller, res, next } = setupController());
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { body: { title: "" } }; // título vazio

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid course data" }),
    );
  });

  it("deve criar curso válido e retornar 201", async () => {
    const req = {
      body: courseData,
    };

    // intercepta o método execute da classe real
    jest
      .spyOn(CreateCourseUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, ...req.body });

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(courseData));
  });
});
