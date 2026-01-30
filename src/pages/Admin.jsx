import { useState } from 'react';
import CardTela from '../components/CardTela'; // Asegúrate de que la ruta sea la correcta


const Admin = ({ inventario, onAgregar, onEliminar, onEditar, onReponer }) => {
    const [form, setForm] = useState({ nombre: '', precio: '', stockInicial: '', color: '', imagen: '' });
    const [error, setError] = useState("");
    const [editandoId, setEditandoId] = useState(null)



    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.nombre.trim === "") {
            setError("Error: El nombre de la tela no puede estar vacio.")
            return;
        } if (Number(form.precio) <= 0) {
            setError("Error: El nombre debe ser mayor a 0.")
            return;
        } if (form.nombre === " ") {
            setError("Error: El nombre de la tella no puede estar vacio")
            return;
        }
        setError("")
            // Convertimos los textos a números antes de enviar
            const telaCompleta = {
                ...form,
                precio: Number(form.precio),
                stock: Number(form.stockInicial),
                stockInicial: Number(form.stockInicial)
            };

        if (editandoId) {
            onEditar(editandoId, telaCompleta);
            setEditandoId(null)
        } else {
            onAgregar(telaCompleta);
            }
           
        setForm({ nombre: '', precio: '', stockInicial: '', color: '', imagen: '' }); // Limpiar formulario
    };

    return (
        <div style={styles.formularioContainer}>
            <h2>Panel de Control - La Casa de las Telas</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Nombre de tela"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock Inicial"
                    value={form.stockInicial}
                    onChange={(e) => setForm({ ...form, stockInicial: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Color (ej: Azul Francia)"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={form.imagen}
                    onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                />

                {error && (<p style={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
                    ⚠️ {error}
                </p>)}

                <button type="submit"
                    style={editandoId ? styles.botonActualizar : styles.botonGuardar}>{editandoId ? 'Actualizar Tela' : 'Guardar Nueva Tela'}
                </button>
            
                {editandoId && (
                    <button
                        type="button"
                        onClick={() => { setEditandoId(null); setForm({ nombre: '', precio: '', stockInicial: '' }) }}
                        style={{ backgroundColor: 'red', border: 'none', color: '#fdfdfd', cursor: 'pointer' }}
                    >
                        Cancelar edición
                    </button> )}
            </form>
            <h3>Gestión de Inventario (Eliminar Productos)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: "50px" }}>
                {inventario.map(tela => (
                    <CardTela
                        key={tela.id}
                        {...tela}
                        showAdmin={true} // <--- ¡Aquí sí aparece el botón!
                        onEliminar={() => onEliminar(tela.id)}
                        onPrepararEdicion={() => {
                            setEditandoId(tela.id)
                            setForm({
                                nombre: tela.nombre, precio: tela.precio, stockInicial: tela.stockInicial
                            })
                            window.scrollTo(0, 0)
                        }}
                    // En admin quizás no necesites el botón de vender, lo puedes ocultar igual
                    />
                ))}
            </div>

            <button onClick={onReponer} >
                Reponer Stock de Todas las Telas
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center', //
        padding: '20px',
        width: '100%',
        minHeight: '80vh'
    },
    formularioContainer: {
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        transition: 'all 0.3s ease',
        // Suaviza el cambio de color al editar
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '500px', // 👈 Evita que el formulario se estire demasiado en pantallas grandes
        backgroundColor: '#2c2c2c',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px'
    },
    botonGuardar: {
        padding: '12px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    botonActualizar: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    errorMsg: {
        color: '#d32f2f',
        backgroundColor: '#ffebee',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '1px solid #d32f2f'
    },
    contenedorCards: {
        display: 'flex',      // Activa el modo flexible
        flexWrap: 'wrap',    // Si no entran más, saltan a la fila de abajo
        gap: '20px',         // Espacio entre cada tarjeta
        justifyContent: 'center', // Centra las tarjetas en la pantalla
        padding: '20px'
    }
};

export default Admin;