import { Router } from "express";

import * as controller from "./school.controller";

const router = Router();

router.post("/", controller.createSchool);
router.get("/", controller.getSchool);

export default router;
