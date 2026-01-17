import { Router } from "express";

import * as controller from "./student.controller";
import { authMiddleware } from "../../common/auth/auth.middleware";

const router = Router();
router.post("/", authMiddleware, controller.createStudent);
router.get("/", authMiddleware, controller.getStudents);

export default router;
