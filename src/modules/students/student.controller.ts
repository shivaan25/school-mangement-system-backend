import { Response } from "express";
import * as studentService from "./student.service";
import { AuthRequest } from "../../types/express";

export const createStudent = async (req: AuthRequest, res: Response) => {
  const student = await studentService.createStudent({
    ...req.body,
    user: req.user!.userId,
  });
  const studentJson = student.toJSON();
  res.status(201).send(studentJson);
};
/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a student (JWT required)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - school
 *               - class
 *               - rollNumber
 *             properties:
 *               school:
 *                 type: string
 *               class:
 *                 type: string
 *               rollNumber:
 *                 type: number
 *     responses:
 *       201:
 *         description: Student created successfully
 *       401:
 *         description: Unauthorized
 */

export const getStudents = async (req: AuthRequest, res: Response) => {
  const students = await studentService.getStudent();
  res.json(students);
};

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students (JWT required)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       401:
 *         description: Unauthorized
 */
