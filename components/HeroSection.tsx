import { HeroBtns } from "./HeroBtns";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/Images/BgHero.png')] bg-cover bg-center" />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#0B0F14]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span
          className="
                        mb-6
                        rounded-full
                        border
                        border-[#14c78b]/30
                        bg-[#14c78b]/10
                        px-5
                        py-2
                        text-sm
                        font-medium
                        text-[#14c78b]
                    "
        >
          پلتفرم اختصاصی فیلم و سریال ایرانی در اروپا
        </span>

        <h1
          className="
                        max-w-4xl
                        text-5xl
                        font-extrabold
                        leading-tight
                        text-white
                        md:text-7xl
                    "
        >
          فیلم و سریال ایرانی را
          <br />
          <span className="text-[#14c78b]">
            بدون VPN
          </span>
          {" "}
          تماشا کنید.
        </h1>

        <p
          className="
                        mt-8
                        max-w-2xl
                        text-lg
                        leading-8
                        text-gray-300
                    "
        >
          آرشیوی از جدیدترین و محبوب‌ترین فیلم‌ها و سریال‌های ایرانی،
          با کیفیت بالا، بدون تبلیغات و با سرورهای پرسرعت اروپا.
        </p>

        <div className="mt-12">
          <HeroBtns />
        </div>

      </div>
    </section>
  );
};