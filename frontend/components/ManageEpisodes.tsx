
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { Episode, Series } from "@/types/Series";

interface StorageSeries {
  name: string;
  path: string;
  files: string[];
}

interface ManageEpisodesProps {
  series: Series;
  storageSeries: StorageSeries | null;
  episodes: Episode[];
  onClose: () => void;
  onEpisodeCreated: (episode: Episode) => void;
}

export const ManageEpisodes = ({
  series,
  storageSeries,
  episodes,
  onClose,
  onEpisodeCreated,
}: ManageEpisodesProps) => {
  const [loadingFile, setLoadingFile] =
    useState<string | null>(null);

  const [episodeTitles, setEpisodeTitles] = useState<
    Record<string, string>
  >({});

  const [episodeNumbers, setEpisodeNumbers] = useState<
    Record<string, string>
  >({});

  const [seasonNumber, setSeasonNumber] =
    useState("1");

  const handleImport = async (filename: string) => {
    const episodeNumber = Number(
      episodeNumbers[filename]
    );

    const title =
      episodeTitles[filename]?.trim() ||
      `قسمت ${episodeNumber}`;

    if (!episodeNumber || episodeNumber < 1) {
      toast.error("شماره قسمت را وارد کنید");
      return;
    }

    try {
      setLoadingFile(filename);

      /*
       * فعلاً videoUrl را بر اساس مسیر Storage
       * می‌سازیم.
       *
       * مرحله تبدیل MKV → MP4 و انتقال/ساخت
       * videoUrl واقعی را در مرحله بعد به Backend
       * اضافه می‌کنیم.
       */

      const videoUrl = `/videos/series/${storageSeries?.name}/${filename}`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series/${series._id}/episodes`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seasonNumber: Number(seasonNumber),
            episodeNumber,
            title,
            videoUrl,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "خطا در ثبت قسمت"
        );
      }

      onEpisodeCreated(data.episode);

      toast.success(
        `قسمت ${episodeNumber} با موفقیت ثبت شد`
      );
    } catch (error: any) {
      console.error(
        "CREATE EPISODE ERROR:",
        error
      );

      toast.error(
        error.message || "خطا در ثبت قسمت"
      );
    } finally {
      setLoadingFile(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4">
      <div className="mx-auto mt-10 w-full max-w-4xl rounded-xl bg-[#111827] p-6">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              مدیریت قسمت‌های {series.title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {storageSeries?.files.length || 0} فایل
              در Storage
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Season */}

        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-400">
            شماره فصل
          </label>

          <input
            type="number"
            min="1"
            value={seasonNumber}
            onChange={(e) =>
              setSeasonNumber(e.target.value)
            }
            className="w-32 rounded-lg bg-gray-900 p-3 text-white outline-none"
          />
        </div>

        {/* Files */}

        {!storageSeries ||
        storageSeries.files.length === 0 ? (
          <div className="rounded-lg border border-gray-700 p-6 text-center">
            <p className="text-gray-400">
              فایلی برای این سریال در Storage پیدا نشد.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {storageSeries.files.map((filename) => {
              const existingEpisode =
                episodes.find(
                  (episode) =>
                    episode.seasonNumber ===
                      Number(seasonNumber) &&
                    episode.episodeNumber ===
                      Number(
                        episodeNumbers[filename]
                      )
                );

              return (
                <div
                  key={filename}
                  className="rounded-lg border border-gray-700 bg-gray-900/50 p-4"
                >
                  <div className="mb-4">
                    <p className="font-semibold text-white">
                      {filename}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[120px_1fr_auto]">
                    <input
                      type="number"
                      min="1"
                      placeholder="قسمت"
                      value={
                        episodeNumbers[
                          filename
                        ] || ""
                      }
                      onChange={(e) =>
                        setEpisodeNumbers(
                          (prev) => ({
                            ...prev,
                            [filename]:
                              e.target.value,
                          })
                        )
                      }
                      className="rounded-lg bg-gray-800 p-3 text-white outline-none"
                    />

                    <input
                      type="text"
                      placeholder={`مثلاً قسمت ${
                        episodeNumbers[
                          filename
                        ] || "۱"
                      }`}
                      value={
                        episodeTitles[
                          filename
                        ] || ""
                      }
                      onChange={(e) =>
                        setEpisodeTitles(
                          (prev) => ({
                            ...prev,
                            [filename]:
                              e.target.value,
                          })
                        )
                      }
                      className="rounded-lg bg-gray-800 p-3 text-white outline-none"
                    />

                    <button
                      onClick={() =>
                        handleImport(filename)
                      }
                      disabled={
                        loadingFile === filename ||
                        !!existingEpisode
                      }
                      className="rounded-lg bg-[#14c78b] px-5 py-2 font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loadingFile === filename
                        ? "در حال ثبت..."
                        : existingEpisode
                        ? "ثبت شده"
                        : "وارد کردن"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Existing episodes */}

        {episodes.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold text-white">
              قسمت‌های ثبت‌شده
            </h3>

            <div className="space-y-2">
              {episodes.map((episode) => (
                <div
                  key={episode._id}
                  className="flex items-center justify-between rounded-lg bg-gray-900 p-3"
                >
                  <div>
                    <span className="font-semibold text-white">
                      فصل {episode.seasonNumber} -
                      قسمت{" "}
                      {episode.episodeNumber}
                    </span>

                    <span className="mr-3 text-sm text-gray-400">
                      {episode.title}
                    </span>
                  </div>

                  <span className="text-sm text-green-400">
                    ثبت شده
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

