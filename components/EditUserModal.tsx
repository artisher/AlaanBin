'use client';

import React, { useState, useEffect } from 'react';
import type { User } from "@/types/user";
// ۱. اینترفیس‌ها (همون‌هایی که داشتی)


interface EditUserModalProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

// ۲. تابع ارسال به سرور (همون‌هایی که داشتی، فقط کمی تمیزتر)
const updateUserOnServer = async (userId: string, userData: User) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),

        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'خطا در بروزرسانی اطلاعات');
        }


        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};


const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose, onSave }) => {

    const [editedUser, setEditedUser] = useState<User | null>(user);


    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setEditedUser((prev) => {
            if (!prev) return prev;

            if (name === 'hasActiveSubscription') {

                return { ...prev, [name]: value === 'true' };
            }


            return { ...prev, [name]: value };
        });


    };

    const handleSave = async () => {
        if (!editedUser) {
            alert('خطا: اطلاعات کاربر یافت نشد.');
            return;
        }

        try {
            // فراخوانی تابع ارسال به سرور
            const updatedData = await updateUserOnServer(editedUser._id, editedUser);

            console.log('اطلاعات با موفقیت ذخیره شد:', updatedData);


            onSave(updatedData);

            // بستن مودال
            onClose();

        } catch (error: any) {
            alert('متاسفانه خطایی رخ داد: ' + (error.message || 'خطای نامشخص'));
            console.error(error);
        }
    };


    if (!isOpen || !editedUser) return null;

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
                    ویرایش کاربر: {editedUser.fullName}
                </h2>

                <div className="space-y-5 flex flex-wrap gap-6 justify-center">
                    {/* نام کامل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">نام کامل</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={editedUser.fullName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* ایمیل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* شماره تلفن */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">شماره تلفن</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={editedUser.phoneNumber}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>
                    <div className='w-full sm:w-75'>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">پسورد </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={editedUser?.password || ""}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>
                    {/* کشور */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">کشور</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={editedUser.country}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* شهر */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">شهر</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={editedUser.city}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* نقش */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">نقش</label>
                        <select
                            id="role"
                            name="role"
                            value={editedUser.role}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="کاربر">کاربر</option>
                            <option value="ادمین">ادمین</option>
                        </select>
                    </div>

                    {/* اشتراک فعال */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="hasActiveSubscription" className="block text-sm font-medium text-gray-300 mb-1">اشتراک فعال</label>
                        <select
                            id="hasActiveSubscription"
                            name="hasActiveSubscription"
                            value={editedUser.hasActiveSubscription ? "true" : "false"}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="true">دارد</option>
                            <option value="false">ندارد</option>
                        </select>
                    </div>

                    {/* تاریخ انقضا */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="subscriptionExpireDate" className="block text-sm font-medium text-gray-300 mb-1">تاریخ تمام شدن عضویت</label>
                        <input
                            type="date"
                            id="subscriptionExpireDate"
                            name="subscriptionExpireDate"
                            value={
                                editedUser.subscriptionExpireDate
                                    ? new Date(editedUser.subscriptionExpireDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        لغو
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#14c78b] rounded-md text-sm font-medium text-white hover:bg-[#12b07a] focus:outline-none focus:ring-2 focus:ring-[#14c78b] focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
