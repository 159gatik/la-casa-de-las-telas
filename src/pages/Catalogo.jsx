import { Card, CardHeader, CardBody, Image as HeroImage, Input, Button } from "@heroui/react";

function Catalogo({ inventario, busqueda, setBusqueda, filtroActivo, setFiltroActivo }) {


    const nombresDeTelas = ["Todas", ...new Set(inventario.map((tela) => tela.nombre.toUpperCase()))]


    const inventarioFiltrado = inventario.filter((item) => {
        // Normalizamos todo para que no importen tildes ni mayúsculas
        const normalizar = (t) => t ? String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

        const busquedaTerm = normalizar(busqueda);
        const nombreItem = normalizar(item.nombre);
        const categoriaItem = normalizar(item.categoria); // 👈 Importante normalizar la categoría también

        // 1. Coincidencia por texto (Buscador)
        const coincideBusqueda = busquedaTerm === "" ||
            nombreItem.includes(busquedaTerm) ||
            categoriaItem.includes(busquedaTerm);

        // 2. Coincidencia por Botón/Categoría
        // Comparamos el filtro activo con la categoría del item
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

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-6">
            <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter uppercase">NUESTRAS TELAS</h1>

            {/*  Buscador Estilizado */}
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

            <div className="w-full max-w-10xl flex gap-2 overflow-x-auto pb-4 mb-8 justify-center flex-wrap">
                {nombresDeTelas.map((nombre) => (
                    <Button
                        key={nombre}
                        size="sm"
                        radius="full"
                        // Cambia de color si está seleccionado (primary) o si no (default/zinc)
                        color={filtroActivo === nombre ? "primary" : "default"}
                        variant={filtroActivo === nombre ? "solid" : "faded"}
                        className={filtroActivo === nombre ? "font-bold shadow-lg text-black" : "text-zinc-400"}
                        onClick={() => setFiltroActivo(nombre)}
                    >
                        {nombre}
                    </Button>
                ))}
            </div>

            {/* 🧶 Cuadrícula de Telas */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {inventarioFiltrado.length > 0 ? (
                    inventarioFiltrado.map((tela) => (
                        <Card key={tela.id} className="bg-zinc-900 border-none shadow-xl hover:scale-105 transition-transform flex flex-col h-full">
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
                                    {/* <div className="bg-green-900/30 px-2 py-1 rounded text-green-400 text-xs font-bold">
                                        DISPONIBLE
                                    </div> */}
                                </div>
                                <h4 className="font-bold text-xl text-white uppercase">{tela.nombre}</h4>
                                <div className="bg-green-900/30 px-10 py-2 rounded text-green-400 text-xs font-bold">
                                    DISPONIBLE
                                </div>

                                {/*BOTÓN DE WHATSAPP s */}
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
                        <div className="col-span-full flex flex-col items-center py-20 rounded-3xl border-2  border-zinc-800">
                        <p className="text-zinc-500 text-xl mb-4">No se encontraron telas que coincidan con "{busqueda}"</p>
                            <Button color="success" variant="flat" onClick={() => setBusqueda("")}>
                            Ver todo el catálogo
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Catalogo;