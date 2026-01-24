import { Router } from "express";
import * as controller from "./teacher.controller";
import { authMiddleware } from "../../common/auth/auth.middleware";

const router = Router();

router.post("/", authMiddleware, controller.createTeacherController);
router.get("/", authMiddleware, controller.getTecherBySchoolIdController);

export default router;
