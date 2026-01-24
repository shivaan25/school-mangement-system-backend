import { Router } from "express";

import * as controller from "./school.controller";
import { authMiddleware } from "../../common/auth/auth.middleware";

const router = Router();

router.post("/", authMiddleware, controller.createSchool);
router.get("/", controller.getSchool);

export default router;
