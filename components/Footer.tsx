import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F14] border-t border-white/10">
      <div className="max-w-7xl   mx-auto px-6 py-14 flex justify-center flex-wrap gap-x-45 gap-y-20 text-center ">

        {/* درباره ما */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-4">درباره ما</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/aboutus"}>معرفی ما</Link></li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/whyus"}>چرا ما </Link> </li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/terms"}>قوانین و مقررات  </Link> </li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/privacy"}>حریم خصوصی</Link></li>
          </ul>
        </div>

        {/* دسته‌بندی‌ها */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-4">دسته‌بندی‌ها</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-[#10B981] transition cursor-pointer">فیلم‌های جدید</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">سریال‌های محبوب</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">برترین‌های هفته</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">ژانرها</li>
          </ul>
        </div>

        {/* پشتیبانی */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-4">پشتیبانی</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/faq"}> سوالات متداول </Link> </li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/contactus"}>تماس با ما</Link></li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/bugreport"}> گزارش مشکل </Link> </li>
            <li className="hover:text-[#10B981] transition cursor-pointer"><Link href={"/request"}>درخواست فیلم</Link></li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="text-[#10B981] font-bold mb-4">شبکه‌های اجتماعی</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-[#10B981] transition cursor-pointer">اینستاگرام</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">تلگرام</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">توییتر</li>
            <li className="hover:text-[#10B981] transition cursor-pointer">یوتیوب</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 text-xs">
          © ۱۴۰۴ تمامی حقوق برای <span className="text-[#10B981] font-semibold">الان بین </span> محفوظ است.
        </div>
      </div>
    </footer>

  )
}
