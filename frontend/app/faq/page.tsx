
export default function FAQ() {
    const faqItems = [
        {
            question: "این سایت مخصوص کدوم کشورهاست؟ آیا فقط برای کاربرهای مقیم اروپا فعاله؟",
            answer: "اینجا خونه‌ی فیلم و سریال ایرانی برای همه‌ی شماست، چه تو اروپا باشین چه هر جای دیگه دنیا! 🌍 ما تلاش کردیم تا بهترین تجربه رو برای همه فراهم کنیم. البته، به خاطر نزدیکی سرورها، کاربرهای مقیم اروپا ممکنه سرعت بالاتری رو تجربه کنن، ولی این به این معنی نیست که بقیه نتونن لذت ببرن! 😉"
        },
        {
            question: " آیا برای استفاده از سایت باید حتماً حساب کاربری بسازم؟",
            answer: "برای اینکه بتونی از تمام امکانات سایت، از جمله دسترسی به آرشیو کامل فیلم‌ها و سریال‌ها، ساخت لیست علاقه‌مندی‌ها و دریافت پیشنهادهای شخصی‌سازی شده لذت ببری، ساخت حساب کاربری لازمه. اما نگران نباش، فرآیند ساخت اکانت خیلی ساده و سریع انجام می‌شه! کافیه روی دکمه “ورود/ثبت‌نام” در بالای صفحه کلیک کنی و با چند مرحله‌ی کوتاه، عضو خانواده‌ی ما بشی. 😊"
        },
        {
            question: "چطور باید اشتراک بخرم؟",
            answer: "خرید اشتراک خیلی ساده‌ست! کافیه به قسمت “خرید اشتراک” در سایت مراجعه کنی و اونجا می‌تونی مستقیماً از طریق واتساپ با تیم پشتیبانی ما در ارتباط باشی. دوستان ما در اسرع وقت راهنماییت می‌کنن تا اشتراک مورد نظرت رو فعال کنی و به دنیای فیلم و سریال ایرانی وارد بشی. 🚀"
        },
        {
            question: " آیا می‌تونم با PayPal یا رمز ارز پرداخت کنم؟ ",
            answer: "ما گزینه‌های پرداخت متنوعی رو برای راحتی شما فراهم کردیم. خوشبختانه، پرداخت از طریق PayPal و اکثر کارت‌های بانکی بین‌المللی امکان‌پذیره. فقط در حال حاضر، پرداخت با رمز ارز مقدور نیست، اما به محض اضافه شدن این امکان، حتماً شما رو مطلع خواهیم کرد"
        },

        {
            question: " آیا می‌تونم روی تلویزیون هوشمند یا Chromecast ببینم؟",
            answer: "قطعاً! ما می‌دونیم که تماشای فیلم روی صفحه بزرگ چقدر لذت‌بخشه. 😊 سایت ما کاملاً بهینه شده تا بتونی تجربه‌ی تماشای بی‌نقصی رو روی انواع دستگاه‌ها، از گوشی موبایل و تبلت گرفته تا تلویزیون‌های هوشمند و از طریق Chromecast داشته باشی. فقط کافیه وارد سایت بشی و لذت ببری!"
        },


    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold text-[#14c78b] mb-4">سوالات متداول</h1>
                <p className="text-lg text-gray-300">پاسخ سوالات پرتکرار شما</p>
            </header>

            <main className="max-w-4xl mx-auto text-center">
                {faqItems.map((item, index) => (
                    <details key={index} className="bg-gray-800 rounded-lg shadow-lg mb-6 cursor-pointer">
                        <summary className="flex justify-between  items-center p-6 text-xl font-semibold focus:outline-none hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out">
                            <h1 className="text-center">{item.question}</h1>
                            <svg className="w-6 h-6 transform transition duration-200 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </summary>
                        <div className="p-6 pt-0 text-gray-300">
                            <h1 className="mt-3">{item.answer}</h1>
                        </div>
                    </details>
                ))}
            </main>

        </div>
    );
};
