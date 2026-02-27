import { Card, CardHeader, CardBody, Image as HeroImage, Pagination, Input, Button, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { useState, useEffect } from "react";
function Catalogo({ inventario, busqueda, setBusqueda, filtroActivo, setFiltroActivo }) {

    const nombresDeTelas = ["Todas", ...new Set(inventario.map((tela) => tela.nombre.toUpperCase()))]
    const [pagina, setPagina] = useState(1);
    const [imagenExpandida, setImagenExpandida] = useState(null);
    useEffect(() => {
        const resetPagina = () => {
            if (pagina !== 1) {
                setPagina(1);
            }
        };

        resetPagina();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroActivo, busqueda]);
    const productosPorPagina = 8;


    const inventarioFiltrado = inventario.filter((item) => {
        const normalizar = (t) => t ? String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

        const busquedaTerm = normalizar(busqueda);
        const nombreItem = normalizar(item.nombre);
        const categoriaItem = normalizar(item.categoria);
        const colorItem = normalizar(item.color); 

        const coincideBusqueda = busquedaTerm === "" ||
            nombreItem.includes(busquedaTerm) ||
            categoriaItem.includes(busquedaTerm) ||
            colorItem.includes(busquedaTerm);


        const coincideFiltro = filtroActivo === "Todas" ||
            normalizar(item.categoria) === normalizar(filtroActivo) ||
            normalizar(item.nombre) === normalizar(filtroActivo);

        return coincideBusqueda && coincideFiltro;
    });


    const enviarConsultaWhatsApp = (tela) => {
        const numeroTelefono = import.meta.env.VITE_WHATSAPP_NUMBER; 
        const mensaje = encodeURIComponent(
            `¡Hola! Consulto por el precio de la tela: ${tela.nombre} - color: ${tela.color}. `
        );
        const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

        window.open(url, "_blank");
    };


    const paginasTotales = Math.ceil(inventarioFiltrado.length / productosPorPagina);


    const itemsPaginados = inventarioFiltrado.slice(
        (pagina - 1) * productosPorPagina,
        pagina * productosPorPagina
    );

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-6">
            {/* Buscador centrado */}
            <div className="w-full max-w-xl mb-12">
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Escribí el nombre o color de la tela..."
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    value={busqueda}
                    onValueChange={setBusqueda}
                />
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1400px]">

                {/* COLUMNA IZQUIERDA: Filtros */}
                <aside className="w-full md:w-72 flex-shrink-0">
                    <div className="sticky top-24"> {/* Se queda pegado al hacer scroll */}
                        <h2 className="text-xl font-bold font-serif mb-6 flex items-center gap-2 text-[#312107] uppercase tracking-wider border-b border-zinc-800 pb-2">
                            <span className="text-[#312107] "></span> Productos
                        </h2>

                        <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Botón para resetear filtro */}
                            <button
                                onClick={() => { setFiltroActivo("Todas"); setPagina(1); }}
                                className={`text-left py-3 px-4 rounded-lg text-sm transition-all ${filtroActivo === "Todas"
                                    ? "bg-primary text-black font-bold shadow-lg"
                                    : "text-zinc-400 hover:bg-zinc-800"
                                    }`}
                            >
                                VER TODO EL CATÁLOGO
                            </button>

                            {/* Mapeo de nombres para la lista lateral */}
                            {nombresDeTelas.map((nombre) => (
                                <button
                                    key={nombre}
                                    onClick={() => {
                                        setFiltroActivo(nombre);
                                        setPagina(1);
                                    }}
                                    className={`text-left py-3 px-4 rounded-lg text-xs uppercase tracking-wide border-b border-zinc-900/50 transition-all ${filtroActivo === nombre
                                        ? "bg-[#312107] text-white font-bold border-l-4 border-l-primary"
                                        : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                                        }`}
                                >
                                    {nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* COLUMNA DERECHA: Cuadrícula de las telas */}
                <main className="flex-1">

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 px-2">
                        {inventarioFiltrado.length > 0 ? (
                            itemsPaginados.map((tela) => (
                                <Card key={tela.id} className="aspect-square relative group">
                                    {/* Imagen de fondo */}
                                    <HeroImage
                                        src={tela.imagen}
                                        className="cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => setImagenExpandida(tela)} // Guardamos la tela seleccionada
                                        removeWrapper
                                    />
                                    <div className="absolute bottom-0 w-full p-3 bg-[#312107]/80 z-10">
                                        <p className="text-white text-sm sm:text-base font-extrabold truncate uppercase tracking-wider">
                                            {tela.nombre}
                                        </p>
                                        <p className="text-white/90 text-[12px] sm:text-sm font-medium uppercase mt-0.5">
                                            {tela.color}
                                        </p>
                                    </div>


                                    <Button
                                        isIconOnly
                                        className="absolute top-4 right-2 z-20 bg-[#25D366] text-white shadow-md min-w-0 w-10 h-10"
                                        radius="full"
                                        onClick={() => enviarConsultaWhatsApp(tela)}
                                        isDisabled={tela.stock <= 0}
                                    >

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.391.079 11.99c0 2.112.552 4.171 1.597 6.01L0 24l6.149-1.613a11.815 11.815 0 005.9 1.594h.005c6.604 0 11.967-5.391 11.97-11.99a11.815 11.815 0 00-3.612-8.471z" />
                                        </svg>
                                    </Button>

                                </Card>
                            )) 
                        ) : (
                            <div className="col-span-full flex flex-col items-center py-20 rounded-3xl border-2 border-zinc-800">
                                <p className="text-zinc-500 text-xl mb-4 text-center px-4">
                                    No se encontraron telas que coincidan con "{busqueda}"
                                </p>
                                <Button color="success" variant="flat" onClick={() => setBusqueda("")}>
                                    Ver todo el catálogo
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Paginacion centrada dentro del area de productos */}
                    {paginasTotales > 1 && (
                        <div className="flex justify-center mt-12 mb-6">
                            <Pagination
                                isCompact
                                showControls
                                classNames={{
                                    wrapper: "gap-2",
                                    item: "bg-transparent text-zinc-600 hover:bg-zinc-800",
                                    cursor: "bg-[#312107] text-white font-bold",
                                }}
                                page={pagina}
                                total={paginasTotales}
                                onChange={(newPage) => {
                                    setPagina(newPage);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        </div>
                    )}
                </main>
            </div>
            <Modal
                isOpen={!!imagenExpandida}
                onClose={() => setImagenExpandida(null)}
                size="2xl"
                backdrop="blur"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0 overflow-hidden bg-white">
                                <img
                                    src={imagenExpandida?.imagen}
                                    className="w-full h-auto object-contain max-h-[70vh]"
                                    alt="Detalle de la tela"
                                />
                                <div className="p-6 bg-white">
                                    <h3 className="text-2xl font-black uppercase text-[#62420e]">
                                        {imagenExpandida?.nombre}
                                    </h3>
                                    <p className="text-gray-600 font-bold uppercase mt-1">
                                        Color: {imagenExpandida?.color}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-4">
                                        Hacé clic en el botón de WhatsApp para consultar disponibilidad y precio.
                                    </p>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Catalogo;