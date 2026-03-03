import { Image as HeroImage } from "@heroui/react";
import ImgBanner from '../assets/banner/telas-banner.png';
export const Banner = () => {
    return (
        <>
            <HeroImage
                src={ImgBanner}
                alt="Banner La Casa de las Telas"
                removeWrapper 
                className="w-full h-60 py-10 flex justify-center  "
            />
        </>
    );
};
