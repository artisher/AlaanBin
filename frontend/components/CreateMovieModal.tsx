'use client';
import type { Movie } from "@/types/movies";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import * as z from 'zod';
export const addedMovie = z.object({
    title: z.string(),
    description: z.string(),
    genre: z.string(),
    year: z.coerce.number(),
    rating: z.coerce.number().optional(),
    topWeek: z.boolean(),
    poster: z.string(),
    product: z.string(),
    videoUrl: z.string().optional(),
});
interface CreateMovieModalProps {
    isOpen: boolean;
    movie: Movie | null;
    onClose: () => void;
    onSave: (updatedMovie: Movie) => void;
    storageFilename?: string | null;
}
export type AddedMovie = z.infer<typeof addedMovie>;

export const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
    isOpen,
    movie,
    onClose,
    storageFilename,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<
        z.input<typeof addedMovie>,
        any,
        z.output<typeof addedMovie>
    >({
        resolver: zodResolver(addedMovie),
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState<{
        filename: string;
        videoUrl: string;
    } | null>(null);

    const uploadVideo = async () => {
        if (!selectedFile) {
            toast.error("لطفاً یک فایل MP4 انتخاب کنید.");
            return null;
        }

        const formData = new FormData();
        formData.append("video", selectedFile);

        setIsUploading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/storage/upload`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "خطا در آپلود فیلم");
            }

            setUploadedVideo({
                filename: result.filename,
                videoUrl: result.videoUrl,
            });

            toast.success("فیلم با موفقیت آپلود شد.");

            return result;

        } catch (error) {
            console.error("Upload error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در آپلود فیلم"
            );

            return null;

        } finally {
            setIsUploading(false);
        }
    };
    const onSubmit = async (data: z.output<typeof addedMovie>) => {
        try {
            let videoUrl: string | undefined;

            // اگر فیلم از قبل روی Storage انتخاب شده
            if (storageFilename) {
                videoUrl = `/videos/${storageFilename}`;
            }

            // اگر فیلم از کامپیوتر انتخاب شده، اول آپلودش کن
            else if (selectedFile) {
                const uploadResult = await uploadVideo();

                if (!uploadResult) {
                    return;
                }

                videoUrl = uploadResult.videoUrl;
            }

            // هیچ فیلمی انتخاب نشده
            else {
                toast.error("لطفاً یک فیلم انتخاب کنید.");
                return;
            }

            // ثبت اطلاعات فیلم در MongoDB
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/movies`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        videoUrl,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(
                    result.message || "خطا در ثبت اطلاعات فیلم"
                );
                return;
            }

            toast.success("فیلم با موفقیت اضافه شد.");
            onClose();

        } catch (error) {
            console.error("Create movie error:", error);
            toast.error("خطایی در ثبت فیلم رخ داد.");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 p-8 rounded-lg w-[90%] max-w-3xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-6 text-white">
                    اضافه کردن فیلم:
                </h2>

                {/* فرم را اینجا قرار دادیم */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-wrap gap-6 justify-center">

                    {/* نام کامل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">نام </label>
                        <input
                            type="text"
                            id="title"
                            {...register('title')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.title && <span className="text-red-400 text-xs mt-1">{errors.title.message}</span>}
                    </div>

                    {/* ایمیل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">توضیحات</label>
                        <input
                            type="text"
                            id="description"
                            {...register('description')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.description && <span className="text-red-400 text-xs mt-1">{errors.description.message}</span>}
                    </div>

                    {/* شماره تلفن */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="poster" className="block text-sm font-medium text-gray-300 mb-1">عکس </label>
                        <input
                            type="text"
                            id="poster"
                            {...register('poster')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.poster && <span className="text-red-400 text-xs mt-1">{errors.poster.message}</span>}
                    </div>

                    {/* کشور */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">امتیاز</label>
                        <input

                            id="country"
                            {...register('rating')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.rating && <span className="text-red-400 text-xs mt-1">{errors.rating.message}</span>}
                    </div>
                    {/* url */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="video"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            فایل فیلم
                        </label>

                        <input
                            type="file"
                            id="video"
                            accept="video/mp4"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;

                                setSelectedFile(file);
                                setUploadedVideo(null);
                            }}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />

                        {selectedFile && (
                            <p className="text-gray-400 text-sm mt-2">
                                فایل انتخاب شده: {selectedFile.name}
                            </p>
                        )}

                        {uploadedVideo && (
                            <p className="text-green-400 text-sm mt-2">
                                ✓ آپلود شد: {uploadedVideo.filename}
                            </p>
                        )}

                        {storageFilename && !uploadedVideo && (
                            <p className="text-blue-400 text-sm mt-2">
                                فایل Storage انتخاب شده: {storageFilename}
                            </p>
                        )}
                    </div>

                    {/* نقش */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">ژانر </label>
                        <input
                            type="text"
                            id="genre"
                            {...register('genre')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />

                        {errors.genre && <span className="text-red-400 text-xs mt-1">{errors.genre.message}</span>}
                    </div>


                    <div className='w-full sm:w-75'>
                        <label htmlFor="topWeek" className="block text-sm font-medium text-gray-300 mb-1"> برتر هفته</label>
                        <select
                            id="topWeek"
                            {...register('topWeek', {
                                setValueAs: (value) => value === 'true' // تبدیل رشته به بولی
                            })}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="true">دارد</option>
                            <option value="false">ندارد</option>
                        </select>
                        {errors.topWeek && <span className="text-red-400 text-xs mt-1">{errors.topWeek.message}</span>}
                    </div>


                    <div className='w-full sm:w-75'>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">تاریخ  ساخت </label>
                        <input
                            type="text"
                            id="year"
                            placeholder="مثال: 1403/12/30"
                            {...register('year')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.year && <span className="text-red-400 text-xs mt-1">{errors.year.message}</span>}
                    </div>

                    <div className='w-full sm:w-75'>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-1">  ساخت کشور</label>
                        <input
                            type="text"
                            id="product"
                            placeholder="مثال: 1403/12/30"
                            {...register('product')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.product && <span className="text-red-400 text-xs mt-1">{errors.product.message}</span>}
                    </div>
                    <div className="mt-8 flex justify-end gap-3 w-full">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            لغو
                        </button>
                        <button
                            disabled={isSubmitting || isUploading}
                            type="submit"
                            className="px-4 py-2 bg-[#14c78b] rounded-md text-sm font-medium text-white hover:bg-[#12b07a] focus:outline-none focus:ring-2 focus:ring-[#14c78b] focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading
                                ? "در حال آپلود فیلم..."
                                : isSubmitting
                                    ? "در حال ثبت..."
                                    : "افزودن فیلم"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
