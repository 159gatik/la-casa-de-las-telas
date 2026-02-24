import { Button, Tooltip } from "@heroui/react"; // Agregamos Tooltip aquí
import { MessageCircle } from "lucide-react";

const BotonWhatsApp = () => {
    const numeroTelefono = import.meta.env.VITE_WHATSAPP_NUMBER;;
    const mensaje = encodeURIComponent('¡Hola! Quisiera saber el precio de una tela');
    const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

    return (
        // Usamos el Tooltip de HeroUI para el globo de texto
        <Tooltip
            content="¡Consultá por tu tela!"
            placement="left"
            showArrow={true}
            classNames={{
                base: [
                    // Esto cambia el color de la flechita (arrow)
                    "before:bg-[#312107]",
                ],
                content: [
                    "py-2 px-4 shadow-xl",
                    "text-white bg-[#312107]", // Fondo marrón y texto blanco
                    "border border-zinc-700",   // Un borde fino para dar relieve
                ],
            }}
        >
            {/* Aquí va tu botón de WhatsApp */}
            <Button
                isIconOnly
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] shadow-2xl"
                onClick={() => window.open(url, "_blank")}
            >
                <MessageCircle size={32} color="white" fill="white" />
            </Button>
        </Tooltip>
    );
};

export default BotonWhatsApp;