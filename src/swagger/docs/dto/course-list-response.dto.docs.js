/**
 * @openapi
 * components:
 *   schemas:
 *     CourseListResponseDTO:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CourseResponseDTO'
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
 *             title: 
 *               type: string
 *             themes:
 *               type: array
 *               items:
 *                 type: string
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *             next:
 *               type: string
 *             prev:
 *               type: string
 */
