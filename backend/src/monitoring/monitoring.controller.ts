import {
    Request,
    Response,
} from "express";

import {
    getServerMonitoring,
} from "./monitoring.service";

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
            message:
                "خطا در دریافت اطلاعات سرور",
        });
    }
};