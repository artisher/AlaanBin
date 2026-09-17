"use client";

import type { Series } from "@/types/Series";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateSeriesModal } from "./CreateSeriesModal";

interface ManageSeriesProps {
  seriesList: Series[];
}

export const ManageSeries = ({
  seriesList,
}: ManageSeriesProps) => {
  const [series, setSeries] = useState<Series[]>(
    seriesList ?? []
  );

  const [addSeries, setAddSeries] = useState(false);

  const handleCloseModal = () => {
    setAddSeries(false);
  };

  const handleSaveSeries = (newSeries: Series) => {
    setSeries((prev) => [newSeries, ...prev]);
    toast.success("سریال اضافه شد");
    setAddSeries(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این سریال مطمئن هستید؟")) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "خطا در حذف سریال"
        );
      }

      setSeries((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("سریال حذف شد");
    } catch (error: any) {
      console.error("DELETE SERIES ERROR:", error);

      toast.error(
        error.message || "خطا در حذف سریال"
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          مدیریت سریال‌ها
        </h2>

        <button
          onClick={() => setAddSeries(true)}
          className="rounded bg-primary px-4 py-2 font-bold text-dark transition hover:bg-green-400"
        >
          + افزودن سریال
        </button>
      </div>

      {/* Series List */}
      {series.length === 0 ? (
        <div className="rounded-lg border border-gray-700 bg-card p-8 text-center">
          <p className="text-gray-400">
            هنوز هیچ سریالی ثبت نشده است.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {series.map((item) => (
            <div
              key={item._id}
              className="rounded-lg border border-gray-700 bg-card p-4 shadow"
            >
              <h3 className="text-lg font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {item.year || "سال نامشخص"}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                ⭐ {item.rating ?? "-"}
              </p>

              <div className="mt-4 flex items-center justify-between">
                {/* فعلاً این دکمه را بعداً وصل می‌کنیم */}
                <button
                  className="text-sm text-primary transition hover:text-green-400"
                  onClick={() => {
                    toast("مدیریت قسمت‌ها در مرحله بعد اضافه می‌شود");
                  }}
                >
                  مدیریت قسمت‌ها
                </button>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="text-sm font-semibold text-red-400 transition hover:text-red-300"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateSeriesModal
        isOpen={addSeries}
        onClose={handleCloseModal}
        onSave={handleSaveSeries}
      />
    </div>
  );
};