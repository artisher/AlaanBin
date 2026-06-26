'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React, { useState } from 'react';

import type { User } from "@/types/user";

interface EditUserModalProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

// تعریف Schema
const addedUser = z.object({
    fullName: z.string().min(1, 'نام الزامی است'),
    email: z.string().email('ایمیل نامعتبر است'),
    phoneNumber: z.string().min(1, 'شماره تلفن الزامی است'),
    hasActiveSubscription: z.boolean(),
    subscriptionExpireDate: z.string().min(1, 'تاریخ الزامی است'),
    country: z.string().min(1, 'کشور الزامی است'),
    city: z.string().min(1, 'شهر الزامی است'),
    password:z.string().min(1,'رشته کوتاه است'),
    role: z.string().min(1, 'نقش الزامی است'),
});

type AddedUser = z.infer<typeof addedUser>;

const CreateUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddedUser>({
        resolver: zodResolver(addedUser),
    });

    const onSubmit = async (data: AddedUser) => {
        console.log('آبجکت نهایی:', data);

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'کاربر با موفقیت اضافه شد');
                onClose(); // بستن مودال بعد از موفقیت
            } else {
                alert(result.message || 'خطا در افزودن کاربر');
            }
        } catch (error) {
            console.error('خطا در ارسال:', error);
            alert('خطای شبکه، لطفاً دوباره تلاش کنید');
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
                    اضافه کردن کاربر:
                </h2>

                {/* فرم را اینجا قرار دادیم */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-wrap gap-6 justify-center">

                    {/* نام کامل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">نام کامل</label>
                        <input
                            type="text"
                            id="fullName"
                            {...register('fullName')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.fullName && <span className="text-red-400 text-xs mt-1">{errors.fullName.message}</span>}
                    </div>

                    {/* ایمیل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* شماره تلفن */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">شماره تلفن</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            {...register('phoneNumber')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.phoneNumber && <span className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</span>}
                    </div>

                    {/* کشور */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">کشور</label>
                        <input
                            type="text"
                            id="country"
                            {...register('country')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.country && <span className="text-red-400 text-xs mt-1">{errors.country.message}</span>}
                    </div>

                    {/* شهر */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">شهر</label>
                        <input
                            type="text"
                            id="city"
                            {...register('city')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.city && <span className="text-red-400 text-xs mt-1">{errors.city.message}</span>}
                    </div>
                    {/* پسورد */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">پسورد</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.city && <span className="text-red-400 text-xs mt-1">{errors.city.message}</span>}
                    </div>
                    {/* نقش */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">نقش</label>
                        <select
                            id="role"
                            {...register('role')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="">انتخاب کنید</option>
                            <option value="user">کاربر</option>
                            <option value="admin">ادمین</option>
                        </select>
                        {errors.role && <span className="text-red-400 text-xs mt-1">{errors.role.message}</span>}
                    </div>

                    {/* اشتراک فعال */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="hasActiveSubscription" className="block text-sm font-medium text-gray-300 mb-1">اشتراک فعال</label>
                        <select
                            id="hasActiveSubscription"
                            {...register('hasActiveSubscription', {
                                setValueAs: (value) => value === 'true' // تبدیل رشته به بولی
                            })}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="true">دارد</option>
                            <option value="false">ندارد</option>
                        </select>
                        {errors.hasActiveSubscription && <span className="text-red-400 text-xs mt-1">{errors.hasActiveSubscription.message}</span>}
                    </div>

                    {/* تاریخ انقضا */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="subscriptionExpireDate" className="block text-sm font-medium text-gray-300 mb-1">تاریخ تمام شدن عضویت</label>
                        <input
                            type="text"
                            id="subscriptionExpireDate"
                            placeholder="مثال: 1403/12/30"
                            {...register('subscriptionExpireDate')}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                        {errors.subscriptionExpireDate && <span className="text-red-400 text-xs mt-1">{errors.subscriptionExpireDate.message}</span>}
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
                            disabled={isSubmitting}
                            type='submit'
                            className="px-4 py-2 bg-[#14c78b] rounded-md text-sm font-medium text-white hover:bg-[#12b07a] focus:outline-none focus:ring-2 focus:ring-[#14c78b] focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'در حال ارسال...' : 'افزودن کاربر'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;

