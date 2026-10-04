import {
    Request,
    Response,
} from "express";

import {
    getServerMonitoring,
} from "./monitoring.service";

import {
    getUserMonitoring,
} from "./user.monitoring";

export const serverMonitoringController = async (
    req: Request,
    res: Response
) => {
    try {
        const monitoring =
            await getServerMonitoring();

        return res.json({
            success: true,
            server: monitoring,
        });
    } catch (error) {
        console.error(
            "SERVER MONITORING ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "خطا در دریافت اطلاعات سرور",
        });
    }
};

export const userMonitoringController = async (
    req: Request,
    res: Response
) => {
    try {
        const users =
            await getUserMonitoring();

        return res.json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(
            "USER MONITORING ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "خطا در دریافت آمار کاربران",
        });
    }
};