import { Card, CardHeader, CardBody, Image, Button, Chip } from "@heroui/react";

const CardTela = ({ nombre, color, stock, precio, imagen, onEliminar, showAdmin, onPrepararEdicion }) => {
    return (
        <Card className="w-[280px] bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden group">
            {/* 🖼️ Imagen de la Tela */}
            <CardBody className="p-0 relative">
                {imagen && (
                    <Image
                        src={imagen}
                        alt={nombre}
                        removeWrapper
                        className="w-full h-[180px]"
                        width="100%"
                    />
                )}

                {/* Chips de estado sobre la imagen */}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                    {stock <= 3 && stock > 0 && (
                        <Chip color="danger" variant="shadow" size="sm" className="font-bold">¡Últimos metros!</Chip>
                    )}
                    {stock <= 0 && (
                        <Chip color="danger" variant="solid" size="sm" className="font-bold">¡Sin Stock!</Chip>
                    )}
                </div>
            </CardBody>

            {/* 📝 Información de la Tela */}
            <CardHeader className="flex-col items-start px-4 py-3 gap-1">
                <p className="text-tiny uppercase font-bold text-primary text-white tracking-widest">{color}</p>
                <h4 className="font-bold text-lg text-white truncate w-full uppercase">{nombre}</h4>

                <div className="flex justify-between w-full items-center mt-2">
                    <p className="text-default-400  text-white text-sm">
                        Stock: <span className={stock < 3 ? "text-danger font-bold" : "text-zinc-200"}>{stock}m</span>
                    </p>
                    {showAdmin && (
                        <p className="text-success font-bold text-white text-lg">${precio}</p>
                    )}
                </div>
            </CardHeader>

            {/* 🛠️ Botones de Admin */}
            {showAdmin && (
                <div className="p-4 pt-0 flex gap-2 w-full">
                    <Button
                        className="flex-1 font-bold text-white bg-indigo-700 hover:bg-indigo-600 shadow-lg shadow-indigo-900/20"
                        size="sm"
                        onClick={onPrepararEdicion}
                    >
                        Editar
                    </Button>
                    <Button
                        className="flex-1 font-bold text-white bg-red-600 hover:bg-indigo-600 shadow-lg shadow-indigo-900/20"
                        color="danger"
                        size="sm"
                        onClick={onEliminar}
                    >
                        Borrar
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default CardTela;
