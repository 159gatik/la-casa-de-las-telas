import { Card, CardHeader, CardBody, Image as HeroImage, Pagination, Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";
function Catalogo({ inventario, busqueda, setBusqueda, filtroActivo, setFiltroActivo }) {

    const nombresDeTelas = ["Todas", ...new Set(inventario.map((tela) => tela.nombre.toUpperCase()))]
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        // Usamos una función de limpieza o un pequeño timeout para 
        // evitar la actualización sincrónica que traba a React
        const resetPagina = () => {
            if (pagina !== 1) {
                setPagina(1);
            }
        };

        resetPagina();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroActivo, busqueda]); // Solo se dispara cuando cambias de categoría o buscás
    const productosPorPagina = 9;


    const inventarioFiltrado = inventario.filter((item) => {
        // se normaiza todo para que no haya tildes ni mayúsculas
        const normalizar = (t) => t ? String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

        const busquedaTerm = normalizar(busqueda);
        const nombreItem = normalizar(item.nombre);
        const categoriaItem = normalizar(item.categoria); // 👈 Importante normalizar la categoría también

        // Coincidencia por texto para el buscacor
        const coincideBusqueda = busquedaTerm === "" ||
            nombreItem.includes(busquedaTerm) ||
            categoriaItem.includes(busquedaTerm);

        // Coincidencia por Botón de Categoría
        // se compara el filtro activo con la categoría del item
        const coincideFiltro = filtroActivo === "Todas" ||
            normalizar(item.categoria) === normalizar(filtroActivo) ||
            normalizar(item.nombre) === normalizar(filtroActivo);

        return coincideBusqueda && coincideFiltro;
    });


    const enviarConsultaWhatsApp = (tela) => {
        const numeroTelefono = "5493704905184"; // El número de tu imagen
        const mensaje = encodeURIComponent(
            `¡Hola! Consulto por la tela: ${tela.nombre} - color: ${tela.color}. `
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

            {/* CONTENEDOR PRINCIPAL: Flexbox para Sidebar y Contenido */}
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
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {inventarioFiltrado.length > 0 ? (
                            itemsPaginados.map((tela) => (
                                <Card key={tela.id} className="bg-[#312107] border-none shadow-xl hover:scale-[1.02] transition-transform flex flex-col h-full">
                                    <CardBody className="p-0 overflow-visible">
                                        <HeroImage
                                            alt={tela.nombre}
                                            className="w-full object-cover h-[240px] rounded-b-none"
                                            src={tela.imagen || "https://via.placeholder.com/300"}
                                            width="100%"
                                        />
                                    </CardBody>
                                    <CardHeader className="flex-col items-start px-4 py-4 gap-2 flex-grow">
                                        <div className="flex justify-between text-white w-full items-center mb-1">
                                            <p className="text-tiny uppercase font-bold text-primary">{tela.color}</p>
                                        </div>
                                        <h4 className="font-bold text-xl text-white uppercase">{tela.nombre}</h4>
                                        <div className="bg-green-900/30 px-6 py-1 rounded text-green-400 text-[10px] font-bold inline-block">
                                            DISPONIBLE
                                        </div>

                                        <Button
                                            className="w-full mt-4 font-bold bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a]"
                                            radius="md"
                                            onClick={() => enviarConsultaWhatsApp(tela)}
                                            isDisabled={tela.stock <= 0}
                                        >
                                            {tela.stock <= 0 ? "SIN STOCK" : "CONSULTAR x WHATSAPP"}
                                        </Button>
                                    </CardHeader>
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

                    {/* Paginación centrada dentro del área de productos */}
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
        </div>
    );
}

export default Catalogo;