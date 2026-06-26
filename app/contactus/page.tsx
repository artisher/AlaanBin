"use client"
import { useState } from "react";

export default function ContactUs() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('در حال ارسال...');
        try {

            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('پیام شما با موفقیت ارسال شد!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setStatus('خطایی در ارسال پیام رخ داد.');
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#11171f] bg-[#05070a] text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-linear-to-br from-[#272e38] bg-[#07090c] rounded-lg shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#14c78b]">تماس با ما</h1>
                <p className="text-center text-gray-300 mb-8 ">
                   . مشتاق شنیدن نظرات، پیشنهادات و سوالات شما هستیم. لطفاً فرم زیر را پر کنید
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">نام</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-[#14c78b] focus:border-[#14c78b]"
                            placeholder="نام شما"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-[#14c78b] focus:border-[#14c78b]"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">پیام</label>
                        <textarea
                            id="message"

                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-[#14c78b] focus:border-[#14c78b]"
                            placeholder="پیام شما..."
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-[#14c78b] cursor-pointer text-white font-semibold rounded-lg hover:bg-[#13a172] focus:outline-none focus:ring-2 focus:ring-[#14c78b] focus:border-[#14c78b] focus:ring-opacity-50 transition duration-200"
                        >
                            ارسال پیام
                        </button>
                    </div>
                </form>
                {status && <p className="text-center mt-6 text-sm text-gray-400">{status}</p>}
                <div className="mt-12 text-center text-gray-400">
                    <p className="mb-2">آدرس: تهران، خیابان آزادی، شرکت اینترنتی الان بین</p>
                  
                    <p>ایمیل: support@alanbin.com</p>
                </div>
            </div>
        </div>
    );
}