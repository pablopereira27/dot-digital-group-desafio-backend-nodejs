const CourseController = require("../../src/domains/course/course.controller");

function setupController() {
  const managerMock = {
    getRepository: jest.fn().mockReturnValue({
      create: jest.fn().mockImplementation((dto) => ({ ...dto, id: 1 })),
      save: jest.fn().mockResolvedValue({ id: 1 }),
    }),
  };

  const controller = new CourseController(managerMock);

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  const next = jest.fn();

  return { controller, res, next, managerMock };
}

module.exports = { setupController };
