import { Button } from "@heroui/react";
import { MessageCircle } from "lucide-react"; // Icono similar a WhatsApp

const BotonWhatsApp = () => {
    const numeroTelefono = "54911XXXXXXXX"; // 👈 Reemplaza con tu número (código de país + área + número)
    const mensaje = encodeURIComponent("Hola! Vengo de la web y quería consultar por una tela.");
    const url = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

    return (
        <Button
            isIconOnly
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] shadow-2xl hover:scale-110 transition-transform duration-300 border-none"
            onClick={() => window.open(url, "_blank")}
        >
            <MessageCircle size={32} color="white" fill="white" />
        </Button>
    );
};

export default BotonWhatsApp;