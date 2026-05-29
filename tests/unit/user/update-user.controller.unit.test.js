const { setupController } = require("../../test-utils/controller.setup");
const UserController = require("../../../src/domains/user/user.controller");
const UpdateUserUseCase = require("../../../src/domains/user/usecases/update-user.usecase");

describe("UserController - UpdateUser - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(UserController));
  });

  it("deve retornar 400 se DTO inválido", async () => {
    const req = { params: { id: 1 }, body: { name: "", email: "" } };

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Invalid user data" }),
    );
  });

  it("deve retornar 404 se usuário não encontrado", async () => {
    const req = { params: { id: 1 }, body: { name: "João", email: "joao@example.com" } };

    jest
      .spyOn(UpdateUserUseCase.prototype, "execute")
      .mockResolvedValue(null);

    await controller.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" }),
    );
  });

  it("deve atualizar usuário válido e retornar 200", async () => {
    const req = { params: { id: 1 }, body: { name: "João", email: "joao@example.com" } };

    jest
      .spyOn(UpdateUserUseCase.prototype, "execute")
      .mockResolvedValue({ id: 1, name: "João", email: "joao@example.com" });

    await controller.update(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "João", email: "joao@example.com" }),
    );
  });
});
