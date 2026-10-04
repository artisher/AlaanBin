import os from "os";
import fs from "fs";
import { execFile } from "child_process";
import { promisify } from "util";

import { User } from "../models/User";

const execFileAsync = promisify(execFile);

type NetworkStats = {
    rxBytes: number;
    txBytes: number;
};

let previousNetworkStats: NetworkStats | null = null;
let previousNetworkTime = Date.now();

const formatGB = (bytes: number) => {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return 0;
    }

    return Number(
        (bytes / 1024 / 1024 / 1024).toFixed(2)
    );
};

const formatMbps = (bytesPerSecond: number) => {
    return Number(
        ((bytesPerSecond * 8) / 1_000_000).toFixed(2)
    );
};

const getCpuUsage = (): Promise<number> => {
    return new Promise((resolve) => {
        const start = os.cpus();

        setTimeout(() => {
            const end = os.cpus();

            let idleDiff = 0;
            let totalDiff = 0;

            for (let i = 0; i < start.length; i++) {
                const startTimes = start[i].times;
                const endTimes = end[i].times;

                const startTotal =
                    startTimes.user +
                    startTimes.nice +
                    startTimes.sys +
                    startTimes.idle +
                    startTimes.irq;

                const endTotal =
                    endTimes.user +
                    endTimes.nice +
                    endTimes.sys +
                    endTimes.idle +
                    endTimes.irq;

                idleDiff +=
                    endTimes.idle -
                    startTimes.idle;

                totalDiff +=
                    endTotal -
                    startTotal;
            }

            if (totalDiff <= 0) {
                resolve(0);
                return;
            }

            const usage =
                ((totalDiff - idleDiff) /
                    totalDiff) *
                100;

            resolve(
                Number(
                    Math.max(
                        0,
                        Math.min(100, usage)
                    ).toFixed(1)
                )
            );
        }, 250);
    });
};

const getDiskUsage = async (path: string) => {
    try {
        const { stdout } = await execFileAsync("df", [
            "-B1",
            path,
        ]);

        const lines = stdout.trim().split("\n");

        if (lines.length < 2) {
            throw new Error("Invalid df output");
        }

        const parts = lines[1].trim().split(/\s+/);

        const total = Number(parts[1]);
        const used = Number(parts[2]);
        const available = Number(parts[3]);

        const usage =
            total > 0
                ? Number(
                    ((used / total) * 100).toFixed(1)
                )
                : 0;

        return {
            total,
            used,
            available,
            usage,

            totalGB: formatGB(total),
            usedGB: formatGB(used),
            availableGB: formatGB(available),
        };
    } catch (error) {
        console.error(
            `DISK MONITOR ERROR (${path}):`,
            error
        );

        return {
            total: 0,
            used: 0,
            available: 0,
            usage: 0,

            totalGB: 0,
            usedGB: 0,
            availableGB: 0,
        };
    }
};

const getNetworkStats = (): NetworkStats => {
    try {
        const data = fs.readFileSync(
            "/proc/net/dev",
            "utf8"
        );

        let rxBytes = 0;
        let txBytes = 0;

        for (const line of data.split("\n")) {
            if (!line.includes(":")) {
                continue;
            }

            const [interfaceName, values] =
                line.trim().split(":");

            if (interfaceName === "lo") {
                continue;
            }

            const parts = values
                .trim()
                .split(/\s+/);

            if (parts.length < 9) {
                continue;
            }

            rxBytes += Number(parts[0]) || 0;
            txBytes += Number(parts[8]) || 0;
        }

        return {
            rxBytes,
            txBytes,
        };
    } catch (error) {
        console.error(
            "NETWORK MONITOR ERROR:",
            error
        );

        return {
            rxBytes: 0,
            txBytes: 0,
        };
    }
};

/**
 * Server monitoring
 */
export const getServerMonitoring = async () => {
    const now = Date.now();

    const [
        cpuUsage,
        rootDisk,
        storageDisk,
    ] = await Promise.all([
        getCpuUsage(),
        getDiskUsage("/"),
        getDiskUsage("/mnt/alanbin"),
    ]);

    // -------------------------
    // Memory
    // -------------------------

    const memoryTotal = os.totalmem();
    const memoryFree = os.freemem();

    const memoryUsed =
        memoryTotal - memoryFree;

    const memoryUsage =
        memoryTotal > 0
            ? Number(
                (
                    (memoryUsed /
                        memoryTotal) *
                    100
                ).toFixed(1)
            )
            : 0;

    // -------------------------
    // Network
    // -------------------------

    const network = getNetworkStats();

    let downloadMbps = 0;
    let uploadMbps = 0;

    if (previousNetworkStats) {
        const elapsed =
            (now - previousNetworkTime) /
            1000;

        if (elapsed > 0) {
            const rxBytes =
                network.rxBytes -
                previousNetworkStats.rxBytes;

            const txBytes =
                network.txBytes -
                previousNetworkStats.txBytes;

            downloadMbps = formatMbps(
                rxBytes / elapsed
            );

            uploadMbps = formatMbps(
                txBytes / elapsed
            );
        }
    }

    previousNetworkStats = network;
    previousNetworkTime = now;

    return {
        hostname: os.hostname(),

        uptime: os.uptime(),

        cpu: {
            usage: cpuUsage,
            cores: os.cpus().length,
        },

        memory: {
            total: memoryTotal,
            used: memoryUsed,
            free: memoryFree,
            usage: memoryUsage,

            totalGB: formatGB(memoryTotal),
            usedGB: formatGB(memoryUsed),
            freeGB: formatGB(memoryFree),
        },

        disk: {
            root: rootDisk,
            storage: storageDisk,
        },

        network: {
            rxBytes: network.rxBytes,
            txBytes: network.txBytes,

            rxGB: formatGB(
                network.rxBytes
            ),

            txGB: formatGB(
                network.txBytes
            ),

            downloadMbps,
            uploadMbps,
        },

        timestamp:
            new Date().toISOString(),
    };
};

/**
 * User monitoring
 */
export const getUserMonitoring = async () => {
    const now = new Date();

    const [
        total,
        activeSubscription,
        expiredSubscription,
        newToday,
        expiringSoon,
    ] = await Promise.all([
        User.countDocuments(),

        User.countDocuments({
            hasActiveSubscription: true,
        }),

        User.countDocuments({
            $or: [
                {
                    hasActiveSubscription: false,
                },
                {
                    subscriptionExpireDate: {
                        $lt: now,
                    },
                },
            ],
        }),

        User.countDocuments({
            signUpDate: {
                $gte: new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                ),
            },
        }),

        User.countDocuments({
            hasActiveSubscription: true,
            subscriptionExpireDate: {
                $gte: now,
                $lte: new Date(
                    now.getTime() +
                    7 * 24 * 60 * 60 * 1000
                ),
            },
        }),
    ]);

    return {
        total,
        activeSubscription,
        expiredSubscription,
        newToday,
        expiringSoon,
    };
};