import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* معرفی برند */}
        <div>
          <h2 className="text-2xl font-bold text-[#10B981] mb-4">
            AlanBin
          </h2>

          <p className="text-gray-400 text-sm leading-7">
            پلتفرم اختصاصی تماشای فیلم و سریال برای کاربران خارج از ایران.
            با کیفیت بالا، بدون تبلیغات مزاحم و دسترسی سریع به جدیدترین
            آثار سینمایی.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs">
              کیفیت بالا
            </span>

            <span className="px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs">
              بدون تبلیغات
            </span>

            <span className="px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs">
              دسترسی نامحدود
            </span>
          </div>
        </div>

        {/* درباره ما */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-5">
            درباره ما
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link className="hover:text-[#10B981] transition" href="/aboutus">
                معرفی ما
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/whyus">
                چرا AlanBin؟
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/terms">
                قوانین و مقررات
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/privacy">
                حریم خصوصی
              </Link>
            </li>
          </ul>
        </div>

        {/* پشتیبانی */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-5">
            پشتیبانی
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link className="hover:text-[#10B981] transition" href="/faq">
                سوالات متداول
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/contactus">
                تماس با ما
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/bugreport">
                گزارش مشکل
              </Link>
            </li>

            <li>
              <Link className="hover:text-[#10B981] transition" href="/request">
                درخواست فیلم
              </Link>
            </li>
          </ul>
        </div>

        {/* ارتباط */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-5">
            ارتباط با ما
          </h3>

          <div className="space-y-3 text-sm text-gray-400">

            <p>
              واتساپ
              <br />
              <span className="text-white" dir="ltr">
                +43 676 4479470
              </span>
            </p>

            <p>
              ایمیل
              <br />
              <span className="text-white">
                support@alanbin.com
              </span>
            </p>

            <div className="flex gap-4 pt-3">
              <Link href="#" className="hover:text-[#10B981] transition">
                Instagram
              </Link>

              <Link href="#" className="hover:text-[#10B981] transition">
                Telegram
              </Link>
            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">

          <p>
            © ۱۴۰۵ تمامی حقوق برای
            <span className="text-[#10B981] font-semibold">
              {" "}AlanBin
            </span>
            محفوظ است.
          </p>

          <p>
            ساخته شده با ❤️ برای ایرانیان خارج از کشور
          </p>

        </div>
      </div>
    </footer>
  );
};