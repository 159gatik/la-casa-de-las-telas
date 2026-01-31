import { useState } from 'react';
import { Input, Button, Card, CardBody, Divider, Alert, Form } from "@heroui/react"; // 👈 Importamos lo nuevo
import CardTela from '../components/CardTela';

const Admin = ({ inventario, onAgregar, onEliminar, onEditar, onReponer }) => {
    const [form, setForm] = useState({ nombre: '', precio: '', stockInicial: '', color: '', imagen: '' });
    const [editandoId, setEditandoId] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const telaCompleta = {
            ...form,
            precio: Number(form.precio),
            stock: Number(form.stockInicial),
            stockInicial: Number(form.stockInicial)
        };

        if (editandoId) {
            onEditar(editandoId, telaCompleta);
            setEditandoId(null);
        } else {
            onAgregar(telaCompleta);
        }

        setForm({ nombre: '', precio: '', stockInicial: '', color: '', imagen: '' });
    };

    return (
        <div className="flex flex-col items-center gap-10 p-6 min-h-screen bg-background">
            <Card className="w-full max-w-[550px] 0 bg-zinc-200  border-zinc-900 shadow-2xl backdrop-blur-md">
                <CardBody className="p-8 gap-6">
                    <h2 className="text-2xl  font-bold text-blue-800 text-center uppercase tracking-tighter">
                        {editandoId ? 'Actualizar Producto' : 'Panel de Control - Agregar Tela'}
                    </h2>

                    <Divider className="bg-zinc-800" />

                    <Form
                        validationBehavior="native"
                        className="flex flex-col gap-6 "
                        onSubmit={onSubmit}
                        onReset={() => {
                            setEditandoId(null);
                            setForm({ nombre: '', precio: '', stockInicial: '', color: '', imagen: '' });
                        }}
                    >
                        <Input
                            isRequired
                            labelPlacement="outside"
                            name="nombre"
                            placeholder="Nombre de la tela"
                            type="text"
                            value={form.nombre}
                            onValueChange={(val) => setForm({ ...form, nombre: val })}
                            errorMessage="El nombre es obligatorio" //
                        />

                        <div className="flex gap-4 w-full">
                            <Input
                                isRequired
                                labelPlacement="outside"
                                name="precio"
                                placeholder="Precio"
                                type="number"
                                startContent={<span className="text-default-400 text-small">$</span>}
                                value={form.precio}
                                onValueChange={(val) => setForm({ ...form, precio: val })}
                                errorMessage="Ingresá un precio válido" //
                            />
                            <Input
                                isRequired
                                labelPlacement="outside"
                                name="stock"
                                placeholder="Metros"
                                type="number"
                                value={form.stockInicial}
                                onValueChange={(val) => setForm({ ...form, stockInicial: val })}
                                errorMessage="El stock es necesario" //
                            />
                        </div>

                        <Input
                            labelPlacement="outside"
                            name="color"
                            placeholder="Color"
                            type="text"
                            value={form.color}
                            onValueChange={(val) => setForm({ ...form, color: val })}
                        />

                        <Input
                            labelPlacement="outside"
                            name="imagen"
                            placeholder="URL de la imagen"
                            type="text"
                            value={form.imagen}
                            onValueChange={(val) => setForm({ ...form, imagen: val })}
                        />

                        <div className="flex gap-3 w-full mt-4">
                            <Button
                                className="flex-1 font-bold text-white bg-green-600"
                                color={editandoId ? "primary" : "success"}
                                type="submit"
                                variant="shadow"
                            >
                                {editandoId ? 'ACTUALIZAR TELA' : 'GUARDAR TELA'}
                            </Button>

                            <Button
                                className="font-bold bg-yellow-600"
                                type="reset"
                                variant="flat"
                                color="danger"
                            >
                                {editandoId ? 'CANCELAR' : 'LIMPIAR'}
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>

            {/* Gestión de Inventario (Lista de Cards) */}
            <div className="w-full max-w-7xl flex flex-col gap-6 mb-10">
                <div className="flex justify-between items-center px-4">
                    <h3 className="text-xl font-bold  uppercase italic">Inventario Actual</h3>
                    <Button color="warning" variant="flat" onClick={onReponer} size="sm" className="font-bold">
                        Reposición Total
                    </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {inventario.map(tela => (
                        <CardTela
                            key={tela.id}
                            {...tela}
                            showAdmin={true}
                            onEliminar={() => onEliminar(tela.id)}
                            onPrepararEdicion={() => {
                                setEditandoId(tela.id);
                                setForm({
                                    nombre: tela.nombre,
                                    precio: tela.precio,
                                    stockInicial: tela.stockInicial,
                                    color: tela.color || '',
                                    imagen: tela.imagen || ''
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' }); //
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;