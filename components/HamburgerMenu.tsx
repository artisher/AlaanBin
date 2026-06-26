"use client"
import { LogOut, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const HamburgerMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const toggleMenu = () => setIsOpen(prev => !prev)

    
    const loginHandler = () => {
        router.push("/login")
        router.refresh()
    };

    const accountHandler = () => router.push("/account")

    return (
        <div>
            {/* Hamburger Icon */}
            <button onClick={toggleMenu} className="flex flex-col gap-1 md:hidden z-50 relative">
                <span className="w-7 h-1 bg-white" />
                <span className="w-7 h-1 bg-white" />
                <span className="w-7 h-1 bg-white" />
            </button>

            {/* Mobile Menu: overlay + panel */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* Overlay: z-40 تا پنل روی اون بیاد */}
                    <div
                        className="absolute inset-0 bg-black/40 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sliding Panel: z-50 و اصلاح gradient */}
                    <div
                        className={`
                                     absolute left-0 top-0 h-full w-2/4 
                                     bg-gradient-to-br from-[#11171f] to-[#05070a]
                                     transition-transform ease-in-out duration-400
                                     translate-x-0
                                     p-4
                                     z-50
                                     shadow-xl
                                 `}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-white font-bold">Menu</h2>
                            <button onClick={() => setIsOpen(false)} className="text-white text-xl">
                                ✕
                            </button>
                        </div>

                        <ul className="mt-4 flex flex-col gap-4">
                            <li className="text-white text-lg">تست 1</li>
                            <li className="text-white text-lg">تست 2</li>
                            <li className="text-white text-lg">تست 3</li>
                            <li className="text-white text-lg">تست 4</li>
                        </ul>

                        {/* Account and Logout Options */}
                        {isLoggedIn && (
                            <div className="mt-8 flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        accountHandler()
                                    }}
                                    className="flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-3 rounded-lg font-medium"
                                >
                                    <UserCircle size={18} />
                                    حساب کاربری
                                </button>

                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        logoutHandler()
                                    }}
                                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg font-medium"
                                >
                                    <LogOut size={18} />
                                    خروج
                                </button>
                            </div>
                        )}

                        {!isLoggedIn && (
                            <button
                                onClick={() => {
                                    loginHandler()
                                    setIsOpen(false)

                                }}
                                className="mt-8 w-full bg-white text-black px-4 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                            >
                                ورود
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
                {isLoggedIn ? (
                    <div className="flex gap-10 items-center">
                        <h1 className="text-white font-bold text-2xl">خوش آمدید</h1>
                        <button onClick={()=>accountHandler()} className="text-white font-bold text-2xl cursor-pointer">
                            <UserCircle />
                        </button>
                        {/* {isOpen && (
                            <div>
                                <div className="mt-8 flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                            accountHandler()
                                        }}
                                        className="flex items-center justify-center gap-2 bg-white
                                         text-gray-800 px-4 py-3 rounded-lg font-medium cursor-pointer"
                                    >
                                        <UserCircle size={18} />
                                        حساب کاربری
                                    </button>

                                   
                                </div>
                            </div>
                        )} */}
                    </div>

                ) : (
                    <div onClick={loginHandler} className="text-black bg-white text-lg p-2 rounded-lg cursor-pointer hover:bg-[#14c78b] hover:text-white transition-all duration-400 flex justify-center items-center gap-2">
                        <span className="mt-1"><UserCircle /></span>
                        <span>ورود</span>
                    </div>
                )}
            </div>
        </div>
    )
}