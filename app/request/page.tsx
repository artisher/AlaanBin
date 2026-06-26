"use client"
export default function Request() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 flex items-start justify-center">
            <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-700 mt-10">

                <h1 className="text-4xl font-extrabold text-center text-white mb-3">
                    <span className="text-primary">الان بین</span> - درخواست محتوا
                </h1>
                <p className="text-center text-gray-400 mb-10">
                    اگر فیلم یا سریالی را می‌خواهید که در حال حاضر در پلتفرم ما موجود نیست، از اینجا درخواست دهید.
                </p>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="request-type" className="block text-lg font-medium mb-2 text-gray-300">
                            نوع درخواست
                        </label>
                        <select
                            id="request-type"
                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 transition duration-200 appearance-none"
                        >
                            <option value="select">------- یک موضوع انتخاب کنید ---------</option>
                            <option value="movie">فیلم جدید</option>
                            <option value="series">سریال جدید</option>
                            <option value="classic-movie">فیلم کلاسیک/قدیمی</option>
                            <option value="season-update">درخواست فصل جدید سریال</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="request-title" className="block text-lg font-medium mb-2 text-gray-300">
                            نام دقیق محتوا (الزامی)
                        </label>
                        <input
                            type="text"
                            id="request-title"
                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 placeholder-gray-400 transition duration-200"
                            placeholder="مثال: Dune: Part Two یا سریال The Last of Us"
                        />
                    </div>

                    <div>
                        <label htmlFor="request-details" className="block text-lg font-medium mb-2 text-gray-300">
                            اطلاعات بیشتر (مثلاً لینک تیزر، نسخه زبان درخواستی)
                        </label>
                        <textarea
                            id="request-details"

                            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:ring-4 focus:ring-[${primaryColor}] focus:border-transparent text-gray-100 placeholder-gray-400 resize-none transition duration-200"
                            placeholder="هر جزئیاتی که فکر می‌کنید به تیم محتوا کمک می‌کند."
                        ></textarea>
                    </div>

                    <div className="text-center pt-6">
                        <button
                            onClick={() => alert('درخواست شما با موفقیت ثبت شد! به زودی بررسی خواهد شد.')}
                            className={`w-full sm:w-auto px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg 
                         hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 bg-primary`}

                        >
                            ثبت درخواست
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}