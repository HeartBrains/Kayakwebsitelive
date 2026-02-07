import { ParallaxHero } from '../ui/ParallaxHero';
import { VisitInfo } from './sections/VisitInfo';

import { VISIT_HERO_IMAGE } from '../../utils/mockDataBilingual';

export function VisitPage() {
    return (
        <div className="w-full bg-white pb-24 min-h-screen">
            {/* Hero Section - Using Maman image from JSON */}
            <ParallaxHero 
                image={VISIT_HERO_IMAGE}
                height="h-[80vh]"
            >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
            </ParallaxHero>

            {/* Content */}
            <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
                <VisitInfo />
            </div>
        </div>
    );
}
