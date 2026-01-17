import { Request, Response } from "express";
import * as schoolServices from "./school.service";

export const createSchool = async (req: Request, res: Response) => {
  const { name } = req.body;
  const school = await schoolServices.createSchool(name);

  res.status(201).json(school);
};
/**
 * @swagger
 * /api/schools:
 *   post:
 *     summary: Create a school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: School created successfully
 *       409:
 *         description: School already exists
 */

export const getSchool = async (req: Request, res: Response) => {
  const schools = await schoolServices.getSchool();
  res.status(201).json(schools);
};
/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Get all schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: List of schools
 */
