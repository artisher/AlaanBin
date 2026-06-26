import { HeroBtns } from "./HeroBtns"


export const HeroSection = () => {
  return (
    <div className="relative  h-75">

      {/* بکگراند بلور شده */}
      <div className="absolute inset-0 bg-[url('/Images/BgHero.png')] bg-cover bg-center blur-sm opacity-60"></div>

      {/* متن */}
      <div className="relative pt-3 flex flex-col text-center  gap-10 justify-center ">
        <h1 className="text-white text-3xl font-bold">
          بدون کندی و محدودیت فیلم ببین
        </h1>
        <h3 className="text-white text-lg  font-bold">دسترسی نامحدود به جدیدترین و قدیمی ترین فیلم‌ها با یک اشتراک </h3>
        <div className="mt-5">
          <HeroBtns />
        </div>
      </div>

    </div>
  )
}
