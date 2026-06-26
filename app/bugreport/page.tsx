"use client"

export default function BugReport() {

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 flex items-start justify-center">
            <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-700 mt-10">

                <h1 className="text-4xl font-extrabold text-center text-white mb-3">
                    <span className="text-primary">الان بین</span> - گزارش مشکل
                </h1>
                <p className="text-center text-gray-400 mb-10">
                    با پر کردن این فرم، به ما کمک می‌کنید تا تجربه تماشای شما را بهبود ببخشیم.
                </p>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="issue-title" className="block text-lg font-medium mb-2 text-gray-300">
                            عنوان مشکل
                        </label>
                        <input
                            type="text"
                            id="issue-title"
                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 placeholder-gray-400 transition duration-200"
                            placeholder="مثال: عدم نمایش زیرنویس در فصل دوم سریال X"
                        />
                    </div>

                    <div>
                        <label htmlFor="issue-description" className="block text-lg font-medium mb-2 text-gray-300">
                            شرح کامل مشکل (الزامی)
                        </label>
                        <textarea
                            id="issue-description"

                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 placeholder-gray-400 resize-none transition duration-200"
                            placeholder="لطفاً جزئیات کامل شامل دستگاه، مرورگر، زمان بروز و هر اطلاعات فنی دیگر را وارد کنید."
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="movie-context" className="block text-lg font-medium mb-2 text-gray-300">
                            محتوای مرتبط (در صورت وجود)
                        </label>
                        <input
                            type="text"
                            id="movie-context"
                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 placeholder-gray-400 transition duration-200"
                            placeholder="نام فیلم/سریال و شماره قسمت یا لینک صفحه"
                        />
                    </div>

                    <div className="text-center pt-6">
                        <button
                            onClick={() => alert('گزارش شما برای تیم فنی ارسال شد. متشکریم!')}
                            className="w-full sm:w-auto px-12 py-4 rounded-xl font-bold cursor-pointer bg-primary text-xl transition-all duration-300 shadow-lg 
                         hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 ">
                            ارسال گزارش
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}