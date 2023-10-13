'use client';
import ForYou from '@/components/Home/ForYou';
import ImageComponent from '@/components/Home/ImageComponent';
import SwiperNext from '@/components/SwiperNext';

export default function Home() {
    return (
        <div>
            <ImageComponent />
            <ForYou />
            {/* <DiagnosisCard /> */}
            <SwiperNext />
            {/* <CardGuide /> */}
            {/* <StartWith /> */}
        </div>
    );
}
