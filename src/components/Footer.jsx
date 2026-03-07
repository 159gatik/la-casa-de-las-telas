import { Divider, Link } from "@heroui/react";

export const Footer = ({ setFiltroActivo, setPagina }) => {
    return (
        <footer className="w-full bg-[#fdedd3] pt-10 pb-6 mt-auto">
            <Divider className="my-4 bg-zinc-800" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-400">
                {/* parte1 */}
                <div className="flex flex-col gap-2 text-[#312107]">
                    <h3 className=" font-bold font-serif text-lg tracking-widest">LA CASA DE LAS TELAS</h3>
                    <p className="text-sm text-black">Desarrollado por G.Rojas</p>
                </div>

                {/* parte2 */}
                <div className="flex flex-col gap-2 text-[#312107]">
                    <h4 className="font-semibold">Navegación</h4>
                    <div className="flex flex-col gap-1">
                        <Link href="/" size="sm" color="foreground" className="hover:text-primary">Inicio</Link>
                        <Link
                            as="button"
                            size="sm"
                            color="foreground"
                            className="hover:text-[#62420e] cursor-pointer bg-transparent border-none p-0 justify-start h-auto font-normal"
                            onPress={() => {
                                setFiltroActivo("telas");
                                if (typeof setPagina === 'function') setPagina(1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Telas
                        </Link>
                        <Link
                            as="button"
                            size="sm"
                            color="foreground"
                            className="hover:text-[#62420e] cursor-pointer bg-transparent border-none p-0 justify-start h-auto font-normal"
                            onPress={() => {
                                setFiltroActivo("merceria");
                                if (typeof setPagina === 'function') setPagina(1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Merceria
                        </Link>
                        <Link
                            as="button"
                            size="sm"
                            color="foreground"
                            className="hover:text-[#62420e] cursor-pointer bg-transparent border-none p-0 justify-start h-auto font-normal"
                            onPress={() => {
                                setFiltroActivo("nuevoIngreso");
                                if (typeof setPagina === 'function') setPagina(1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Nuevo Ingreso
                        </Link>

                    </div>
                </div>

                {/* parte 3 */}
                <div className="flex flex-col gap-2 text-[#312107]">
                    <h4 className=" font-semibold">Contacto</h4>
                    <p className="text-sm italic">"Calidad y Precio al alcance de tu mano."</p>
                    <p className="text-xs mt-2 text-zinc-500">© 2026 La Casa de las Telas - Mayor Villafañe, Formosa.</p>
                </div>
            </div>
        </footer>
    );
};