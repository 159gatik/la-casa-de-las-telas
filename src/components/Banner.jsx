import { useState, useEffect } from "react";
import Image2 from '../../public/image2.jpg';
import Image3 from '../../public/image3.jpg';
import Image0 from '../../public/image.jpg';

export const Banner = () => {
    const images = [Image3, Image0, Image2,];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full  h-50 md:h-99 overflow-hidden ">

            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={img} className="w-full h-full object-cover" alt={`Banner ${index + 1}`} />
                </div>
            ))}

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};