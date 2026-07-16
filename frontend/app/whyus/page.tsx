import StatsSection from "@/components/AboutUsStatic";
import { WhyUsCards } from "@/components/WhyUsCards";

export default function WhyUs() {


    return (
        <div className="overflow-x-hidden">


            <WhyUsCards />
            <div>
                <StatsSection />
            </div>
        </div>

    );
}