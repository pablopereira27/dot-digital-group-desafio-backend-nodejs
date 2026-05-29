const { setupController } = require("../../test-utils/controller.setup");
const UserController = require("../../../src/domains/user/user.controller");
const DeleteUserUseCase = require("../../../src/domains/user/usecases/delete-user.usecase");

describe("UserController - DeleteUser - Unit", () => {
  let controller, res, next;

  beforeEach(() => {
    ({ controller, res, next } = setupController(UserController));
  });

  it("deve retornar 404 se o usuário não for encontrado", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteUserUseCase.prototype, "execute")
      .mockResolvedValue(false);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" }),
    );
  });

  it("deve deletar o usuário e retornar 204", async () => {
    const req = { params: { id: 1 } };

    jest
      .spyOn(DeleteUserUseCase.prototype, "execute")
      .mockResolvedValue(true);

    await controller.remove(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
