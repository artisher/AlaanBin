import { User } from "../models/User";

export const getUserMonitoring = async () => {
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const sevenDaysFromNow = new Date(
        now.getTime() +
        7 * 24 * 60 * 60 * 1000
    );

    const [
        total,
        admins,
        active,
        expired,
        neverSubscribed,
        newToday,
        expiringSoon,
    ] = await Promise.all([
        // کل کاربران
        User.countDocuments({
            role: "user",
        }),

        // ادمین‌ها
        User.countDocuments({
            role: "admin",
        }),

        // اشتراک واقعاً فعال
        User.countDocuments({
            role: "user",
            hasActiveSubscription: true,
            subscriptionExpireDate: {
                $gt: now,
            },
        }),

        // اشتراک منقضی یا غیرفعال
        User.countDocuments({
            role: "user",
            $or: [
                {
                    hasActiveSubscription: false,
                },
                {
                    subscriptionExpireDate: {
                        $lte: now,
                    },
                },
            ],
        }),

        // هیچ اشتراکی نداشته
        User.countDocuments({
            role: "user",
            $or: [
                {
                    subscriptionExpireDate: {
                        $exists: false,
                    },
                },
                {
                    subscriptionExpireDate: null,
                },
            ],
        }),

        // ثبت‌نام امروز
        User.countDocuments({
            role: "user",
            signUpDate: {
                $gte: startOfToday,
            },
        }),

        // اشتراک‌هایی که تا ۷ روز آینده منقضی می‌شوند
        User.countDocuments({
            role: "user",
            hasActiveSubscription: true,
            subscriptionExpireDate: {
                $gt: now,
                $lte: sevenDaysFromNow,
            },
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

        newToday,
        expiringSoon,

        activePercentage,
    };
};