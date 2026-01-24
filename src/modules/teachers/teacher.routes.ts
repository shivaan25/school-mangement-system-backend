import { Router } from "express";
import * as controller from "./teacher.controller";

const router = Router();

router.post("/", controller.createTeacherController);
router.get("/", controller.getTecherBySchoolIdController);

export default router;
