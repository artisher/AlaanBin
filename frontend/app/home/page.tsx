import { LiveBanner } from "@/components/LiveBanner";
import { HomeContent } from "@/components/HomeContent";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0B0F14]">

            <LiveBanner />

            <main className="mx-auto w-full max-w-[1650px] px-6 py-10 lg:px-10">
                <HomeContent />
            </main>

        </div>
    );
}