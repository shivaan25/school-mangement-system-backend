import { Request, Response } from "express";
import * as studentService from "./student.service";

export const createStudent = async (req: Request, res: Response) => {
  const student = await studentService.createStudent(req.body);
  const studentJson = student.toJSON();
  res.status(201).send(studentJson);
};

export const getStudents = async (req: Request, res: Response) => {
  const students = await studentService.getStudent();
  res.json(students);
};

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
