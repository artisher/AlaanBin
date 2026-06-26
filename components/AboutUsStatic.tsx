'use client';

import { Clock, Film, Heart, PlayCircle, Star, Users } from 'lucide-react';

const StatsSection = () => {
    // لیست آمارها
    const stats = [
        {
            value: '2',
            unit: 'هزار',
            label: 'فیلم و سریال',
            icon: <Film className="w-6 h-6 text-gray-400" />
        },
        {
            value: '1',
            unit: 'هزار',
            label: 'کاربر فعال روزانه',
            icon: <Users className="w-6 h-6 text-gray-400" />
        },
        {
            value: '12',
            unit: 'هزار',
            label: 'تعداد بازدید فیلم‌ها',
            icon: <PlayCircle className="w-6 h-6 text-gray-400" />
        },
        {
            value: '89',
            unit: 'درصد',
            label: 'رضایت کاربران',
            icon: <Star className="w-6 h-6 text-gray-400" />
        },
        {
            value: '1345',
            unit: 'ساعت',
            label: 'میانگین زمان تماشا',
            icon: <Clock className="w-6 h-6 text-gray-400" />
        },
        {
            value: '3+',
            unit: 'هزار',
            label: 'لایک‌های روزانه',
            icon: <Heart className="w-6 h-6 text-gray-400" />
        },
    ];

    const logos = [
    'انیمیشن', 'انیمه', 'فیلم', 'سریال',
         'آموزش', 'مستند ',
    ];

    return (
        
        <div className="w-full bg-gray-900 rounded-2xl p-6 md:p-10 font-sans text-right" dir="rtl">

            {/* --- بخش تب‌ها --- */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 border-b border-gray-700 pb-4">
                {['فیلم و سریال', 'مستند', 'انیمیشن', 'سریال‌های ایرانی', 'فیلم‌های خارجی'].map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${index === 0
                                ? 'bg-gray-700 text-blue-400 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- بخش آمارها --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {stat.icon}
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm font-bold text-gray-300 mb-1">
                            {stat.unit}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- بخش لوگوها --- */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {logos.map((logo, index) => (
                    <div key={index} className="text-lg font-bold text-gray-500 hover:text-gray-300 cursor-default">
                        {logo}
                    </div>
                ))}
            </div>

            {/* --- فوتر --- */}
            <div className="mt-8 text-center text-xs text-gray-600">
                منبع: بر اساس داده‌های سال 1405
            </div>
        </div>
    );
};

export default StatsSection;