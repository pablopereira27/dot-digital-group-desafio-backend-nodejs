/**
 * @openapi
 * components:
 *   schemas:
 *     CourseResponseDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - themes
 *         - image_url
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the course
 *         title:
 *           type: string
 *           description: Course title
 *         description:
 *           type: string
 *           description: Course description
 *         themes:
 *           type: array
 *           enum: ["inovação", "tecnologia", "marketing", "empreendedorismo", "agro"]
 *           description: Course themes
 *         image_url:
 *           type: string
 *           description: URL of the course image
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
 */
