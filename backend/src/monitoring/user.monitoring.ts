import { User } from "../models/User";

export const getUserMonitoring = async () => {
    const now = new Date();

    const [
        total,
        admins,
        active,
        expired,
        neverSubscribed,
    ] = await Promise.all([
        User.countDocuments(),

        User.countDocuments({
            role: "admin",
        }),

        User.countDocuments({
            role: "user",
            hasActiveSubscription: true,
            subscriptionExpireDate: {
                $gt: now,
            },
        }),

        User.countDocuments({
            role: "user",
            subscriptionExpireDate: {
                $lte: now,
            },
        }),

        User.countDocuments({
            role: "user",
            $or: [
                {
                    hasActiveSubscription: false,
                },
                {
                    subscriptionExpireDate: {
                        $exists: false,
                    },
                },
            ],
        }),
    ]);

    const activePercentage =
        total > 0
            ? Number(
                ((active / total) * 100).toFixed(1)
            )
            : 0;

    return {
        total,
        admins,
        active,
        expired,
        neverSubscribed,
        activePercentage,
    };
};