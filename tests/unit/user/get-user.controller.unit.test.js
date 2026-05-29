const { setupController } = require("../../test-utils/controller.setup");
const UserController = require("../../../src/domains/user/user.controller");
const GetUserUseCase = require("../../../src/domains/user/usecases/get-user.usecase");

describe("UserController - GetUser - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(UserController));
  });

  it("deve retornar 404 se usuário não encontrado", async () => {
    const req = { params: { id: 1 } };

    jest.spyOn(GetUserUseCase.prototype, "execute").mockResolvedValue(null);

    await controller.get(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" }),
    );
  });

  it("deve retornar usuário válido", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(GetUserUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, name: "João", email: "joao@example.com" });

    await controller.get(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "João", email: "joao@example.com" }),
    );
  });
});
