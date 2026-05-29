/**
 * @openapi
 * components:
 *   schemas:
 *     CohortListResponseDTO:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CohortResponseDTO'
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
 *             status:
 *               type: string
 *               enum: ["disponível", "encerrado"]
 *             start_date:
 *               type: string
 *               format: date
 *             end_date:
 *               type: string
 *               format: date
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
