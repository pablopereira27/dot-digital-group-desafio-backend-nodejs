/**
 * @openapi
 * components:
 *   schemas:
 *     UserListResponseDTO:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponseDTO'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             total:
 *               type: integer
 *             totalPages:
 *               type: integer
 *         filters:
 *           type: object
 *           properties:
 *             name: 
 *               type: string
 *             email:
 *               type: string
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *             first:
 *               type: string
 *             prev:
 *               type: string
 *             next:
 *               type: string
 *             last:
 *               type: string
 */
