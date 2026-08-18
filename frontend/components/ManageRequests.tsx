"use client";

import { useState } from "react";
import type {
    UserRequest,
    RequestStatus,
} from "@/types/request";

interface ManageRequestsProps {
    requestsList?: UserRequest[];
}

export const ManageRequests = ({
    requestsList = [],
}: ManageRequestsProps) => {

    const [requests, setRequests] = useState<UserRequest[]>(requestsList);
    const [selectedRequest, setSelectedRequest] =
        useState<UserRequest | null>(null);

    const [filter, setFilter] =
        useState<"all" | "bug" | "film" | "contact">("all");

    const [loading, setLoading] = useState(false);

    const filteredRequests =
        filter === "all"
            ? requests
            : requests.filter((request) => request.type === filter);

    const changeStatus = async (
        id: string,
        status: RequestStatus
    ) => {
        try {
            setLoading(true);

            const res = await fetch(
                `/api/admin/requests/${id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در تغییر وضعیت"
                );
            }

            setRequests((prev) =>
                prev.map((request) =>
                    request._id === id
                        ? {
                            ...request,
                            status: data.request.status,
                            updatedAt: data.request.updatedAt,
                        }
                        : request
                )
            );

            setSelectedRequest((prev) =>
                prev && prev._id === id
                    ? {
                        ...prev,
                        status: data.request.status,
                        updatedAt: data.request.updatedAt,
                    }
                    : prev
            );

        } catch (error) {
            console.error(error);
            alert("خطا در تغییر وضعیت درخواست");
        } finally {
            setLoading(false);
        }
    };

    const deleteRequest = async (id: string) => {
        const confirmed = window.confirm(
            "آیا مطمئن هستید که می‌خواهید این درخواست را حذف کنید؟"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const res = await fetch(
                `/api/admin/requests/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در حذف درخواست"
                );
            }

            setRequests((prev) =>
                prev.filter((request) => request._id !== id)
            );

            if (selectedRequest?._id === id) {
                setSelectedRequest(null);
            }

        } catch (error) {
            console.error(error);
            alert("خطا در حذف درخواست");
        } finally {
            setLoading(false);
        }
    };

    const getTypeLabel = (type: UserRequest["type"]) => {
        switch (type) {
            case "film":
                return "درخواست فیلم";

            case "bug":
                return "گزارش باگ";

            case "contact":
                return "تماس با ما";
        }
    };

    const getStatusLabel = (status: RequestStatus) => {
        switch (status) {
            case "pending":
                return "در انتظار بررسی";

            case "reviewing":
                return "در حال بررسی";

            case "resolved":
                return "حل شده";

            case "rejected":
                return "رد شده";
        }
    };

    const getStatusClass = (status: RequestStatus) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/20 text-yellow-400";

            case "reviewing":
                return "bg-blue-500/20 text-blue-400";

            case "resolved":
                return "bg-green-500/20 text-green-400";

            case "rejected":
                return "bg-red-500/20 text-red-400";
        }
    };

    return (
        <div className="space-y-6">

            {/* فیلترها */}
            <div className="flex flex-wrap gap-2">

                {[
                    { id: "all", label: "همه" },
                    { id: "film", label: "درخواست فیلم" },
                    { id: "bug", label: "گزارش باگ" },
                    { id: "contact", label: "تماس با ما" },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() =>
                            setFilter(
                                item.id as
                                | "all"
                                | "bug"
                                | "film"
                                | "contact"
                            )
                        }
                        className={`px-4 py-2 rounded-lg transition ${
                            filter === item.id
                                ? "bg-primary text-dark font-bold"
                                : "bg-card text-gray-400 hover:text-white"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}

            </div>

            {/* تعداد */}
            <div className="text-gray-400 text-sm">
                تعداد درخواست‌ها: {filteredRequests.length}
            </div>

            {/* لیست */}
            <div className="space-y-3">

                {filteredRequests.length === 0 ? (
                    <div className="bg-card rounded-xl p-8 text-center text-gray-500">
                        درخواستی وجود ندارد
                    </div>
                ) : (
                    filteredRequests.map((request) => (
                        <div
                            key={request._id}
                            className="bg-card border border-gray-800 rounded-xl p-5"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                <div className="space-y-2">

                                    <div className="flex items-center gap-3 flex-wrap">

                                        <span className="text-white font-bold">
                                            {getTypeLabel(request.type)}
                                        </span>

                                        <span
                                            className={`px-2 py-1 rounded-md text-xs ${getStatusClass(
                                                request.status
                                            )}`}
                                        >
                                            {getStatusLabel(request.status)}
                                        </span>

                                    </div>

                                    {request.movieTitle && (
                                        <div className="text-gray-300">
                                            🎬 {request.movieTitle}
                                        </div>
                                    )}

                                    {request.subject && (
                                        <div className="text-gray-300">
                                            {request.subject}
                                        </div>
                                    )}

                                    <div className="text-gray-500 text-sm">
                                        {request.name} — {request.email}
                                    </div>

                                </div>

                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            setSelectedRequest(request)
                                        }
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
                                    >
                                        مشاهده
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={() =>
                                            deleteRequest(request._id)
                                        }
                                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg disabled:opacity-50"
                                    >
                                        حذف
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))
                )}

            </div>

            {/* Modal جزئیات */}
            {selectedRequest && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedRequest(null)}
                >
                    <div
                        className="bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="text-xl font-bold text-white">
                                جزئیات درخواست
                            </h3>

                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ×
                            </button>

                        </div>

                        <div className="space-y-5">

                            <div>
                                <span className="text-gray-500 text-sm">
                                    نوع
                                </span>

                                <p className="text-white mt-1">
                                    {getTypeLabel(selectedRequest.type)}
                                </p>
                            </div>

                            {selectedRequest.movieTitle && (
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        فیلم
                                    </span>

                                    <p className="text-white mt-1">
                                        {selectedRequest.movieTitle}
                                    </p>
                                </div>
                            )}

                            {selectedRequest.subject && (
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        موضوع
                                    </span>

                                    <p className="text-white mt-1">
                                        {selectedRequest.subject}
                                    </p>
                                </div>
                            )}

                            <div>
                                <span className="text-gray-500 text-sm">
                                    کاربر
                                </span>

                                <p className="text-white mt-1">
                                    {selectedRequest.name}
                                </p>

                                <p className="text-gray-400 text-sm">
                                    {selectedRequest.email}
                                </p>
                            </div>

                            {selectedRequest.page && (
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        صفحه
                                    </span>

                                    <p className="text-white mt-1">
                                        {selectedRequest.page}
                                    </p>
                                </div>
                            )}

                            <div>
                                <span className="text-gray-500 text-sm">
                                    پیام
                                </span>

                                <p className="text-gray-300 mt-2 whitespace-pre-wrap leading-7">
                                    {selectedRequest.message}
                                </p>
                            </div>

                            {/* تغییر وضعیت */}
                            <div>
                                <span className="text-gray-500 text-sm">
                                    وضعیت
                                </span>

                                <div className="flex flex-wrap gap-2 mt-2">

                                    {[
                                        "pending",
                                        "reviewing",
                                        "resolved",
                                        "rejected",
                                    ].map((status) => (
                                        <button
                                            key={status}
                                            disabled={loading}
                                            onClick={() =>
                                                changeStatus(
                                                    selectedRequest._id,
                                                    status as RequestStatus
                                                )
                                            }
                                            className={`px-3 py-2 rounded-lg text-sm ${
                                                selectedRequest.status === status
                                                    ? getStatusClass(
                                                        status as RequestStatus
                                                    )
                                                    : "bg-gray-800 text-gray-400 hover:text-white"
                                            }`}
                                        >
                                            {getStatusLabel(
                                                status as RequestStatus
                                            )}
                                        </button>
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};