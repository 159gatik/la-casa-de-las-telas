import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";


export const PromoModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [copiado, setCopiado] = useState("false");

    useEffect(() => {
        const promoVista = sessionStorage.getItem("promoVista")

        if (!promoVista) {
            const timer = setTimeout(() => {
                onOpen();
                sessionStorage.setItem("promoVista", "true")   
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [onOpen])

    const copiarCodigo = () => {
        navigator.clipboard.writeText("TELAS10")
        setCopiado(true)
        setTimeout(()=>setCopiado(false),2000)
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            radius="none" // Bordes rectos para mantener el estilo editorial
            backdrop="blur"
            className="bg-white"// Difumina el fondo (el catálogo) para destacar el cartel
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[#312107] text-center text-2xl font-bold uppercase tracking-tight">
                            ¡Llegaste en el mejor momento!
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-zinc-600 font-medium text-center">
                                ¡Tenemos un regalo de bienvenida!
                            </p>
                            <p className="text-zinc-600 font-medium text-center">
                                Disfrutá de un <strong className="text-[#62420e]">15% de descuento</strong> en tu compra.
                            </p>

                            {/* Caja destacada con el código */}
                            <div className="bg-zinc-100 border border-zinc-300 p-4 mt-2 text-center">
                                <span className="text-sm text-zinc-500 uppercase tracking-widest block mb-1">
                                    Tu código de descuento:
                                </span>
                                <span className="font-bold text-3xl text-[#312107] tracking-widest">
                                    TELAS15
                                </span>
                            </div>
                        </ModalBody>    
                        <p className="text-zinc-600 text-center font-medium">
                            *Válido para todo Marzo*
                        </p>
                        <ModalFooter className="flex-col sm:flex-row justify-between border-t border-zinc-100 mt-4">
                            <Button
                                variant="light"
                                onPress={onClose}
                                radius="none"
                                className="text-zinc-500 font-medium w-full sm:w-auto"
                            >
                                Quizás más tarde
                            </Button>

                            <Button
                                className="bg-[#312107] text-white font-bold w-full sm:w-auto"
                                onPress={copiarCodigo}
                                radius="none"
                            >
                                {copiado ? "¡Código Copiado!" : "Copiar Código"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
    

}