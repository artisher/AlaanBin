
'use client';
import { useState } from 'react';
import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';


import type { User } from "@/types/user";


interface ManageUserProps {
    userList: User[];
}

export const ManageUser = ({ userList }: ManageUserProps) => {
    const [users, setUsers] = useState<User[]>(userList);
    const [editingUser, setEditingUser] = useState<User | null>(null); // کاربری که در حال ویرایشه
    const [addUser, setAddUser] = useState<boolean | any>(false);
    // تابعی که وقتی دکمه حذف کلیک میشه اجرا میشه
    const handleDelete = (id: string) => {
        if (confirm('آیا از حذف این کاربر مطمئن هستید؟')) {

            fetch(`http://localhost:5000/api/admin/users/${id}`, {
                credentials: "include",
                method: 'DELETE',
            })
                .then(res => {
                    if (res.ok) {
                        setUsers(prev => prev.filter(user => user._id !== id));
                    } else {
                        alert('خطا در حذف کاربر');
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert('مشکلی پیش آمد.');
                });
        }
    };

    // تابعی که وقتی دکمه ویرایش کلیک میشه اجرا میشه
    const handleEdit = (id: string) => {
        console.log('جستجو برای کاربر با ID:', id);
        const userToEdit = users.find(u => u._id === id);
        console.log(userToEdit, "INJAAAAAAA");
        if (userToEdit) {
            console.log('کاربر پیدا شد:', userToEdit);
            console.log(userToEdit);
            setEditingUser(userToEdit);
        } else {
            console.error('کاربر با این ID پیدا نشد!');
        }
    };



    const handleSaveEdit = (updatedUser: User) => {

        setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        alert('تغییرات کاربر با موفقیت ذخیره شد (فقط در نمایش محلی).');
        setEditingUser(null);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
    };
    const handleCloseUserModal = () => {
        setAddUser(null);
    };
    console.log("MANAGE USER", users[0]);
    return (
        <div>
            <div className="space-y-4 p-6">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-white mb-3">مدیریت کاربران</h2>
                    <button
                        onClick={() => { setAddUser(true) }
                        }
                        className="bg-primary text-dark px-4 py-2 rounded font-bold cursor-pointer hover:bg-green-400 transition"
                    >
                        افزودن کاربر +
                    </button>
                </div>
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="p-4">نام</th>
                                <th className="p-4">ایمیل</th>
                                <th className="p-4">نقش</th>
                                <th className="p-4">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-750 transition duration-150 ease-in-out">
                                    <td className="p-4 text-white">{user.fullName}</td>
                                    <td className="p-4 text-gray-300">{user.email}</td>
                                    <td className="p-4">
                                        {/* استایل‌های مناسب‌تر برای نقش */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'ادمین'
                                            ? 'bg-primary-light text-primary-dark'
                                            : 'bg-gray-600 text-gray-200'
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-3 items-center">
                                            <button
                                                onClick={() => handleEdit(user._id)}
                                                className="text-blue-400 cursor-pointer hover:text-blue-300 text-sm font-semibold transition duration-150 ease-in-out"
                                            >
                                                ویرایش
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-400 cursor-pointer hover:text-red-300 text-sm font-semibold transition duration-150 ease-in-out"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        هیچ کاربری یافت نشد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* مودال ویرایش اینجا اضافه میشه */}
            <EditUserModal
                isOpen={!!editingUser}
                user={editingUser}
                onClose={handleCloseModal}
                onSave={handleSaveEdit}
            />
            <CreateUserModal
                isOpen={!!addUser}
                onClose={handleCloseUserModal}
                user={addUser}
                onSave={handleSaveEdit} />
        </div >
    );
};
