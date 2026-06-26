import Link from "next/link";

export default function AboutUs() {

    return (
        <section className="bg-linear-to-br from-[#11171f] bg-[#05070a] text-white min-h-screen py-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto flex flex-col justify-center text-center">


                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#14c78b] ">
                    درباره الان بین
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
                    پل ارتباطی شما با سینما و تلویزیون ایران در   اروپا
                </p>

                <div className=" space-y-8 text-gray-300 flex flex-col justify-center">

                    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-[#14c78b]  mb-4 text-center">
                            هدف ما: فراتر از یک پلتفرم
                        </h2>
                        <p className="mb-4 leading-relaxed">
                            الان بین، با افتخار پلتفرمی اختصاصی برای ایرانیان عزیز مقیم اروپا است؛ جایی که اشتیاق شما به تماشای فیلم‌ها و سریال‌های ایرانی، با سرعتی بی‌نظیر و کیفیتی پایدار پاسخ داده می‌شود. ما درک می‌کنیم که دسترسی آسان و بدون دغدغه به محتوای فرهنگی، چقدر برای حفظ ارتباط با ریشه‌ها و لذت بردن از هنر سرزمینمان اهمیت دارد.
                        </p>
                    </div>

                    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-[#14c78b] mb-4 text-center">
                            چرا الان بین؟ ویژگی‌های منحصر به فرد
                        </h2>
                        <ul className="list-disc list-inside md:list-outside space-y-3 leading-7">
                            <li>
                                <span className="font-bold text-[#14c78b] ">سرعت و پایداری فوق‌العاده:</span> با بهره‌گیری از زیرساخت‌های بهینه شده برای اروپا، الان بین تجربه‌ای روان و سریع را برای کاربران خود در اروپا را تضمین می‌کند. دیگر نگران قطعی یا کندی نباشید!
                            </li>
                            <li>
                                <span className="font-bold text-[#14c78b] ">آرشیو جامع و به‌روز:</span> مجموعه‌ای کامل از بهترین‌ها و جدیدترین‌های سینما و تلویزیون ایران، از آثار ماندگار تا سریال‌های روز.
                            </li>
                            <li>
                                <span className="font-bold text-[#14c78b] ">محتوای درخواستی شما:</span> بخش کوچکی از تعهد ما به شما، گوش دادن به خواسته‌هایتان است. اگر محتوایی را در آرشیو ما نیافتید، کافیست درخواست دهید تا در سریع‌ترین زمان ممکن، آن را برایتان فراهم کنیم.
                            </li>
                            <li>
                                <span className="font-bold text-[#14c78b] ">نگاهی به خانه، از راه دور:</span> الان بین فراتر از یک پلتفرم پخش فیلم است؛ اینجا خانه‌ای مجازی است که عطر و طعم فرهنگ و هنر ایران را به خانه‌های شما در قلب اروپا می‌آورد.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-[#14c78b]  mb-4 text-center">
                            همراه لحظات فرهنگی شما
                        </h2>
                        <p className="leading-relaxed">
                            ما در الان بین، تلاش می‌کنیم تا با ارائه بهترین تجربه، همراه لحظات فرهنگی و تفریحی شما باشیم و پیوندی مستحکم میان شما و میراث غنی هنری ایران برقرار سازیم.
                        </p>
                    </div>

                    <div className="mt-12 ">
                        <Link href={"/register"} className="inline-block bg-[#10B981] text-[#e6e6e6]  hover:bg-green-600  font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-lg">
                            به خانواده الان بین بپیوندید!
                        </Link>
                    </div>

                </div>

            </div>
        </section>


    )
}