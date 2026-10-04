import { Router } from "express";


import {
    serverMonitoringController,
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

export default router;