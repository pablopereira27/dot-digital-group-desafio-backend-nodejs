const UserResponseDTO = require("./user-response.dto");
const { getPaginationMeta } = require("../../../utils/pagination.util");
const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class UserListResponseDTO {
  constructor(users, { page, limit, total, filters }) {
    this.data = users.map((user) => new UserResponseDTO(user));
    this.filters = filters;
    this.pagination = getPaginationMeta(total, page, limit);
    this.links = buildHateoasLinks(
      "/users",
      { pagination: { page, limit, total }, filters },
      ["list", "create", "pagination"],
    );
  }
}

module.exports = UserListResponseDTO;
