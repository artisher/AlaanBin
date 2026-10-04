import { Router } from "express";

import {
    serverMonitoringController,
    userMonitoringController,
} from "./monitoring.controller";

import {
    adminMiddleware,
} from "../middleware/admin";

import checkSubscription from "../middleware/auth.middleware";

const router = Router();

router.get(
    "/server",
    checkSubscription,
    adminMiddleware,
    serverMonitoringController
);

router.get(
    "/users",
    checkSubscription,
    adminMiddleware,
    userMonitoringController
);

export default router;