import { Router } from "express";
import studentRoutes from "./modules/students/student.routes";
import schoolRoutes from "./modules/schools/school.routes";

const router = Router();

router.use("/students", studentRoutes);
router.use("/school", schoolRoutes);

export default router;
