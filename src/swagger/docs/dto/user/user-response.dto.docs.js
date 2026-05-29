/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponseDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the user
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *             list:
 *               type: string
 *             create:
 *               type: string
 *             update:
 *               type: string
 *             delete:
 *               type: string
 *
 */
