import ImgBotonTelas from '../assets/banner/telas.png'
import ImgBotonMerceria from '../assets/banner/merceria.png'
export const AccesoDirectos = ({setFiltroActivo}) => {
    return (
        <>
            <div className="w-full flex flex-wrap grid grid-cols-3 md:grid-cols-3 justify-center md:gap-16 py-10 bg-background">

                <button
                    onClick={() => setFiltroActivo("telas")}
                    className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="relative  w-30 h-30 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl">
                        <img
                            src={ImgBotonTelas}
                            alt="Ver sección Telas"
                            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                            <span className="text-white font-black text-1xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">
                                Telas
                            </span>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setFiltroActivo("merceria")}
                    className="group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="relative w-30 h-30 md:w-56 md:h-56 rounded-full overflow-hidden  shadow-2xl">
                        <img
                            src={ImgBotonMerceria}
                            alt="Ver sección Mercería"
                            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                            <span className="text-white font-black text-1xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">
                                Mercería
                            </span>
                        </div>
                    </div>
                </button>
                <button
                    onClick={() => setFiltroActivo("nuevoIngreso")}
                    className="group flex flex-col items-center gap-4 transition-transform brightness-120 hover:scale-105 color- active:scale-95"
                >
                    <div className="relative w-30 h-30 md:w-56 md:h-56 bg-[#920B3A] rounded-full overflow-hidden shadow-2xl">

                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                            <span className="text-white font-black text-1xl md:text-3xl uppercase tracking-tighter drop-shadow-lg">
                                Nuevo Ingreso
                            </span>
                        </div>
                    </div>
                </button>

            </div>
        </>
    );
};
