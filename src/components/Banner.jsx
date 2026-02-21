import { Image as HeroImage } from "@heroui/react";
import ImgBanner from '../assets/banner/telas-banner.png'; // Verificá bien esta ruta
import ImgBotonTelas from '../assets/banner/telas.png'
import ImgBotonMerceria from '../assets/banner/merceria.png'
export const Banner = () => {
    return (
        <>
            <HeroImage
                src={ImgBanner}
                alt="Banner La Casa de las Telas"
                removeWrapper // 👈 Fundamental para quitar las barras de scroll
                className="w-full flex justify-center bg-background shadow-lg "
            />
        </>
    );
};
