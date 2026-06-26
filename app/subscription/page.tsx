import Head from 'next/head';
import Link from 'next/link';

const subscriptionPlans = [
    { id: 'monthly', name: 'اشتراک ۱ ماهه', price: '5 یورو', details: 'دسترسی کامل به آرشیو فیلم و سریال ایرانی برای ۱ ماه.' },
    { id: 'quarterly', name: 'اشتراک ۳ ماهه', price: '14 یورو', details: 'دسترسی کامل به آرشیو فیلم و سریال ایرانی برای ۳ ماه.' },
    { id: 'semiannual', name: 'اشتراک ۶ ماهه', price: '27 یورو', details: 'دسترسی کامل به آرشیو فیلم و سریال ایرانی برای ۶ ماه.' },
];

export default function SubscriptionPage() {



    const priceClasses = "text-4xl font-bold text-primary mb-2";
    const descriptionClasses = "text-gray-300 mb-4";
    const buttonClasses = "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-full"; // دکمه خرید
    const whatsappUrl = `https://wa.me/+436764479470`;
    const plans = subscriptionPlans;

    return (
        <div className="min-h-screen bg-linear-to-br from-[#11171f] bg-[#05070a] py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
            <Head>
                <title>اشتراک ویژه فیلم و سریال</title>
                <meta name="description" content="اشتراک ویژه فیلم و سریال ایرانی با بهترین کیفیت" />
            </Head>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-100 mb-8">
                    اشتراک ویژه فیلم و سریال ایرانی
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className="flex flex-col gap-3 bg-gray-800 text-center shadow-xl rounded-lg p-6 mb-6 transition-transform duration-300 hover:scale-105 text-gray-200">
                            <h2 className="text-2xl font-bold text-gray-200 mb-3">{plan.name}</h2>
                            <p className={priceClasses}>{plan.price}</p>
                            <p className={descriptionClasses}>{plan.details}</p>
                            <p className="text-sm text-gray-400 mb-3 ">برای خرید این اشتراک , در واتساپ به شماره <span className='block my-1 font-bold text-xl'>+43 676 4479470</span> پیام دهید.</p>
                            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" passHref className='bg-primary cursor-pointer text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-full'>
                                <button className=" cursor-pointer">
                                    خرید از طریق واتساپ
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-lg text-gray-300">
                       ! همین حالا اشتراک خود را تهیه کنید و به دنیایی از فیلم و سریال ایرانی دسترسی پیدا کنید
                    </p>
                </div>
            </div>
        </div>
    );
}
