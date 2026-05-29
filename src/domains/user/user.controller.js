const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { formatValidationErrors } = require("../../utils/validations");

const CreateUserUseCase = require("./usecases/create-user.usecase");
const ListUsersUseCase = require("./usecases/list-users.usecase");
const GetUserUseCase = require("./usecases/get-user.usecase");
const UpdateUserUseCase = require("./usecases/update-user.usecase");
const DeleteUserUseCase = require("./usecases/delete-user.usecase");

const CreateUserDTO = require("./dto/create-user.dto");
const UpdateUserDTO = require("./dto/update-user.dto");
const UserResponseDTO = require("./dto/user-response.dto");
const UserListResponseDTO = require("./dto/user-list-response.dto");

class UserController {
  constructor(manager) {
    this.manager = manager;
  }

  create = async (req, res, next) => {
    try {
      const dto = plainToInstance(CreateUserDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid user data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new CreateUserUseCase(this.manager);
      const user = await usecase.execute(dto);
      res.status(201).json(new UserResponseDTO(user));
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const { page, limit } = req.pagination;

      const usecase = new ListUsersUseCase(this.manager);
      const [users, total] = await usecase.execute(page, limit, req.filters);

      res.json(
        new UserListResponseDTO(users, {
          page,
          limit,
          total,
          filters: req.filters,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  get = async (req, res, next) => {
    try {
      const usecase = new GetUserUseCase(this.manager);
      const user = await usecase.execute(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(new UserResponseDTO(user));
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = plainToInstance(UpdateUserDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Invalid user data",
          errors: formatValidationErrors(errors),
        });
      }

      const usecase = new UpdateUserUseCase(this.manager);
      const user = await usecase.execute(req.params.id, dto);

      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(new UserResponseDTO(user));
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const usecase = new DeleteUserUseCase(this.manager);
      const deleted = await usecase.execute(req.params.id);

      if (!deleted) return res.status(404).json({ message: "User not found" });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
