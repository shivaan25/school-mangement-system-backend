import { Router } from "express";

import * as controller from "./student.controller";

const router = Router();
router.post("/createStudent", controller.createStudent);
router.get("/getStudents", controller.getStudents);

export default router;
