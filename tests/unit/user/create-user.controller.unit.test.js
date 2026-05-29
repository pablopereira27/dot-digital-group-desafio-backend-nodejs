const { setupController } = require("../../test-utils/controller.setup");
const UserController = require("../../../src/domains/user/user.controller");
const CreateUserUseCase = require("../../../src/domains/user/usecases/create-user.usecase");

describe("UserController - CreateUser - Unit", () => {
  let controller, res, next;
  const userData = {
    name: "João",
    email: "joao@example.com",
  };

  beforeEach(() => {
    ({ controller, res, next, managerMock } = setupController(UserController));
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { body: { name: "" } }; // nome vazio

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid user data" }),
    );
  });

  it("deve criar usuário válido e retornar 201", async () => {
    const req = {
      body: userData,
    };

    // intercepta o método execute da classe real
    jest
      .spyOn(CreateUserUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, ...req.body });

    await controller.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(userData));
  });
});
