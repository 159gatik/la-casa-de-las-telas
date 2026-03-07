import React from 'react'
import { Button, Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/react'

// Componente de lista
const RenderLista = ({ closeFn, filtroActivo, handleFiltro, nombresDeTelas }) => (
    <div className='flex flex-col gap-2 p-4'>
        <button
            onClick={() => handleFiltro("Todas", closeFn)}
            className={`text-left py-3 px-4 rounded-xl text-sm transition-all shadow-sm
                ${filtroActivo === "Todas" ? "bg-[#62420e] text-white font-bold" : "bg-white text-zinc-800 border border-zinc-100"} `}
        >
            VER TODO EL CATÁLOGO
        </button>
        <div className='my-2 border-t border-zinc-200' />
        {nombresDeTelas?.map((nombre) => (
            <button
                key={nombre}
                onClick={() => handleFiltro(nombre, closeFn)}
                className={`text-left py-3 px-4 rounded-xl text-xs uppercase text-zinc-800 tracking-wide transition-all border-b border-zinc-50 ${filtroActivo === nombre ? "bg-[#f5f1ea] text-[#62420e] font-black border-l-4 border-l-[#62420e]" : "bg-white text-zinc-500"} `}>
                {nombre}
            </button>
        ))}
    </div>
);

export const CategoryFilters = ({ nombresDeTelas, filtroActivo, setFiltroActivo, setPagina }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handleFiltro = (nombre, closeFn) => {
        setFiltroActivo(nombre);
        setPagina(1);
        if (typeof closeFn === 'function') closeFn()
    }

    return (
        <>
            <div className="lg:hidden flex justify-between items-center mb-4 px-2 w-full">
                <h2 className="text-xl font-black text-[#62420e] uppercase">Catálogo</h2>
                <Button onPress={onOpen} className="bg-[#62420e] text-white font-bold shadow-lg">
                    FILTROS
                </Button>
                
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="right"
                size="full" // Cambiado a full para asegurar cobertura en móvil
                scrollBehavior="inside"
                classNames={{
                    base: "m-0 bg-white z-[999]", // Fondo blanco sólido y encima de todo
                    wrapper: "z-[999]",
                    backdrop: "bg-[#312107]/50 backdrop-blur-sm", // Oscurece el catálogo de fondo
                }}
            >
                <ModalContent className="bg-white">
                    {(onClose) => (
                        <ModalBody className="pt-10 bg-white">
                            <div className="flex justify-between items-center mb-6 px-4">
                                <h2 className="text-xl font-black text-[#62420e]">CATEGORÍAS</h2>
                               
                            </div>
                            {/* Contenedor con scroll propio para la lista larga de telas */}
                            <div className="overflow-y-auto  h-full pb-20">
                                <RenderLista
                                    nombresDeTelas={nombresDeTelas}
                                    filtroActivo={filtroActivo}
                                    handleFiltro={handleFiltro}
                                    closeFn={onClose}
                                />
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
                
            </Modal>

            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                    <h2 className="text-sm font-black text-zinc-700 uppercase tracking-[0.2em] mb-6">
                        PRODUCTOS
                    </h2>
                    <div className="max-h-[47vh] overflow-y-auto  pr-2 custom-scrollbar">
                        <RenderLista
                            
                            nombresDeTelas={nombresDeTelas}
                            filtroActivo={filtroActivo}
                            handleFiltro={handleFiltro}
                        />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default CategoryFilters;