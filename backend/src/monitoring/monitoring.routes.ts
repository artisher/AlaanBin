import { Router } from "express";

import {
    serverMonitoringController,
    userMonitoringController,
} from "./monitoring.controller";

import { adminMiddleware } from "../middleware/admin";

const router = Router();

router.get(
    "/server",
    adminMiddleware,
    serverMonitoringController
);

router.get(
    "/users",
    adminMiddleware,
    userMonitoringController
);

export default router;