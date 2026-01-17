import { Router } from "express";

import * as controller from "./student.controller";

const router = Router();
router.post("/", controller.createStudent);
router.get("/", controller.getStudents);

export default router;
