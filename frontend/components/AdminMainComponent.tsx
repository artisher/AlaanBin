"use client";
import { ManageUser } from '@/components/ManageUser';
import { MangeFilms } from '@/components/MangeFilms';
import { MangePayment } from '@/components/MangePayment';
import { useState } from 'react';
import type { User } from "@/types/user";
import type { Movie} from "@/types/movies";

export const AdminMainComponent = ({ moviesList = [], userList = [] }:
    {
        moviesList?: Movie[], userList?: User[]
    }) => {

    const [activeTab, setActiveTab] = useState<'users' | 'movies' | 'payments'>('users');
    const tabs = [
        { id: 'movies', label: 'فیلم‌ها' },
        { id: 'users', label: 'کاربران' },
        { id: 'payments', label: 'پرداخت‌ها' },
    ];
    

    return (
        <div>
            <div className="min-h-screen bg-dark text-gray-200 flex flex-col md:flex-row">

                {/* سایدبار / منوی تب‌ها */}
                <aside className="w-full md:w-64 bg-card border-l border-gray-800 flex flex-col">
                    <div className="p-6 border-b border-gray-700">
                        <h1 className="text-2xl font-bold text-primary">پنل ادمین</h1>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full text-right px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-primary text-dark font-bold shadow-lg shadow-green-900/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-gray-700">
                        <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition">
                            خروج از حساب
                        </button>
                    </div>
                </aside>

                {/* محتوای اصلی */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">خوش آمدید، ادمین</span>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark font-bold">
                                A
                            </div>
                        </div>
                    </header>

                    {/* نمایش محتوای تب فعال */}
                    <div className="animate-fade-in">
                        {activeTab === 'movies' && <MangeFilms moviesList={moviesList} />}
                        {activeTab === 'users' && <ManageUser userList={userList} />}
                        {activeTab === 'payments' && <MangePayment />}
                    </div>
                </main>
            </div>
        </div>
    )
}
