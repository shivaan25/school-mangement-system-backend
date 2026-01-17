import { Router } from "express";
import studentRoutes from "./modules/students/student.routes";
import schoolRoutes from "./modules/schools/school.routes";
import authRoutes from "./modules/auth/auth.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/schools", schoolRoutes);

export default router;
