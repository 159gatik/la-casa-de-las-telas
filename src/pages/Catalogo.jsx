
import CardTela from '../components/CardTela';

import { Card, CardHeader, CardBody, Image, Input, Button } from "@heroui/react";
function Catalogo({ inventario, busqueda, setBusqueda }) {
    //const totalMetros = inventario.reduce((acc, tela) => acc + tela.stock, 0)
;
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-6">
            <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">NUESTRAS TELAS</h1>

            {/* 🔍 Buscador Estilizado */}
            <div className="w-full max-w-xl mb-12">
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Escribí el nombre o color..."
                    variant="bordered"
                    radius="lg"
                    size="lg"
                    value={busqueda}
                    onValueChange={setBusqueda}
                    startContent={<span className="text-2xl"></span>}
                />
            </div>

            {/* 🧶 Cuadrícula de Telas */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {inventario.length > 0 ? (
                    inventario.map((tela) => (
                        <Card key={tela.id} className="bg-zinc-900 border-none shadow-xl hover:scale-105 transition-transform">
                            <CardBody className="p-0 overflow-visible">
                                <Image
                                    alt={tela.nombre}
                                    className="w-full object-cover h-[240px] rounded-b-none"
                                    src={tela.imagen || "https://via.placeholder.com/300"}
                                    width="100%"
                                />
                            </CardBody>
                            <CardHeader className="flex-col items-start px-4 py-4">
                                <div className="flex justify-between text-white w-full items-center mb-1">
                                    <p className="text-tiny uppercase font-bold text-primary">{tela.color}</p>
                                    <div className="bg-green-900/30 px-2 py-1 rounded text-green-400 text-xs font-bold">
                                        {tela.stock} mtrs disponibles
                                    </div>
                                </div>
                                <h4 className="font-bold text-xl text-white uppercase">{tela.nombre}</h4>
                                <p className="text-default-500 text-white font-semibold mt-1 text-lg">${tela.precio} <span className="text-xs font-normal">/ metro</span></p>
                            </CardHeader>
                        </Card>
                    ))
                ) : (
                    /* ⚠️ Empty State (Aviso de no encontrado) */
                    <div className="col-span-full flex flex-col items-center py-20  rounded-3xl border-2 border-dashed border-zinc-800">
                        <p className="text-zinc-500 text-xl mb-4">No se encontraron telas que coincidan con "{busqueda}"</p>
                        <Button color="primary" variant="flat" onClick={() => setBusqueda("")}>
                            Ver todo el catálogo
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    
}
// const styles = {
//     // ... tus otros estilos
//     contenedorCards: {
//         display: 'flex',      // Activa el modo flexible
//         flexWrap: 'wrap',    // Si no entran más, saltan a la fila de abajo
//         gap: '20px',         // Espacio entre cada tarjeta
//         justifyContent: 'center', // Centra las tarjetas en la pantalla
//         padding: '20px'
//     },
//     buscadorContainer: { marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px' },
//     buscadorInput: { padding: '12px', width: '300px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '16px' },
//     botonLimpiar: { background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'red' }
// };
export default Catalogo;