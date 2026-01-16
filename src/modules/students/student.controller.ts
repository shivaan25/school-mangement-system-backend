/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - class
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               class:
 *                 type: string
 *                 example: 10-A
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 */
export const createStudent = async (req, res) => {
  // controller logic
};
