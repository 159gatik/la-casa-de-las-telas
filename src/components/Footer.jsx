import { Divider, Link } from "@heroui/react";

export const Footer = () => {
    return (
        <footer className="w-full bg-zinc-950 pt-10 pb-6 mt-auto">
            <Divider className="my-4 bg-zinc-800" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-400">
                {/* Sección 1: Marca */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold text-lg tracking-widest">LA CASA DE LAS TELAS</h3>
                    <p className="text-sm">Desarrollado por G.Rojas</p>
                </div>

                {/* Sección 2: Enlaces rápidos */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-zinc-200 font-semibold">Navegación</h4>
                    <div className="flex flex-col gap-1">
                        <Link href="/" size="sm" color="foreground" className="hover:text-primary">Inicio</Link>
                        
                    </div>
                </div>

                {/* Sección 3: Info */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-zinc-200 font-semibold">Contacto</h4>
                    <p className="text-sm italic">"Calidad y Precio al alcance de tu mano."</p>
                    <p className="text-xs mt-2 text-zinc-500">© 2026 La Casa de las Telas - Mayor Villafañe, Formosa.</p>
                </div>
            </div>
        </footer>
    );
};