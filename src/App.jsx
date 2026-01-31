import { db } from './firebase';
import { collection, deleteDoc, onSnapshot, query, addDoc, updateDoc, doc, increment } from 'firebase/firestore';
import { BrowserRouter, Route, Routes, Link, Navigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Catalogo from './pages/Catalogo.jsx';
import Admin from './pages/Admin.jsx';
import Contabilidad from './pages/Contabilidad.jsx';
import Ingreso from './components/Ingreso.jsx'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Footer } from './components/Footer.jsx';
import BotonWhatsApp from './components/BotonWhatsapp.jsx';
function App() {
    const [inventario, setInventario] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // Estado para el historial de ventas
    const [ventas, setVentas] = useState(() => {
        const guardadas = localStorage.getItem("ventas_telas");
        return guardadas ? JSON.parse(guardadas) : [];
    });

    const [busqueda, setBusqueda] = useState("");

    const inventarioFiltrado = inventario.filter(tela =>
        tela.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
        (tela.color && tela.color.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()))
    )



    useEffect(() => {
        const q = query(collection(db, "telas"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const telasFirebase = [];
            querySnapshot.forEach((doc) => {
                telasFirebase.push({ ...doc.data(), id: doc.id })
            })
            setInventario(telasFirebase)
        })
        return () => unsubscribe()
    }, []);



    // Guardar en localStorage cada vez que cambie
    // useEffect(() => {
    //     localStorage.setItem("ventas_telas", JSON.stringify(ventas));
    // }, [ventas]);



    // Función para registrar la venta manual
    const registrarVentaManual = async (nuevaVenta) => {
        try {
            const telaRef = doc(db, "telas", nuevaVenta.telaId)
            await updateDoc(telaRef, {
                stock: increment(-Number(nuevaVenta.metros))
            })
            setVentas([...ventas, { ...nuevaVenta, id: Date.now() }])
            console.log("venta registrada");
        } catch (error) {
            console.error("Error de sincronización", error);
            alert("Se registró la venta, pero no se descontó de firebase")
        }
    };

    //Eliminar un registro de venta
    const eliminarVenta = async (id) => {

        const ventaAEliminar = ventas.find(v => v.id === id);

        if (!ventaAEliminar || !ventaAEliminar.telaId) {
            console.error("No se encontró la venta");
            setVentas(ventas.filter(v => v.id !== id))
            return;
        }

        try {
            const telaRef = doc(db, "telas", String(ventaAEliminar.telaId));
            await updateDoc(telaRef, {
                stock: increment((ventaAEliminar.metros))
            })

            const nuevoHistorial = ventas.filter(v => v.id !== id);
            setVentas(nuevoHistorial)
            console.log("Stock reintegrado");

        } catch (error) {
            console.error("error al reintegrar stock:", error);
            alert("No se pudo devolver el stock")
            setVentas(ventas.filter(v => v.id !== id))


        }


    };

    // const venderMetro = (id) => {
    //     const nuevoInventario = inventario.map(tela => {
    //         if (tela.id === id && tela.stock > 0) {
    //             return { ...tela, stock: tela.stock - 1 };
    //         }
    //         return tela;
    //     })
    //     setInventario(nuevoInventario);
    // }

    // const reponerTodo = () => {
    //     const nuevoInventario = inventario.map(tela => {
    //         return { ...tela, stock: tela.stockInicial };
    //     });
    //     setInventario(nuevoInventario);
    // }
    
    const agregarTela = async (nueva) => {
        try {
            await addDoc(collection(db, "telas"), {
                nombre: nueva.nombre,
                precio: Number(nueva.precio),
                stock: Number(nueva.stock),
                stockInicial: Number(nueva.stockInicial),
                color: nueva.color,
                imagen: nueva.imagen
            })
            console.log("tela guardada con exito");

        } catch (error) {
            console.error("error al guardar:", error)
            alert("no se pudo guardar en la nube")
        }

    };

    const eliminarTela = async (id) => {

        const confirmar = window.confirm("Seguro que queres eliminar esta tela?")

        if (confirmar) {
            try {
                const telaRef = doc(db, "telas", id)
                await deleteDoc(telaRef)
                console.log("Tela eliminada");
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar la tela")
            }
        }


    }

    const editarTela = async (id, telaActualizada) => {
        try {
            const telaRef = doc(db, "telas", id)
            await updateDoc(telaRef, {
                nombre: telaActualizada.nombre || "",
                precio: Number(telaActualizada.precio) || 0,
                stockInicial: Number(telaActualizada.stockInicial) || 0,
                stock: Number(telaActualizada.stock) || 0,
                color: telaActualizada.color || "", // si es undefined usa ""
                imagen: telaActualizada.imagen
            })
            console.log("Actualizada con exito");

        } catch (error) {
            console.error("Error al editar", error)
            alert("no se pudo editar")
        }
    }
    return (
        <div className="flex flex-col min-h-screen"> 
        <BrowserRouter>
            <Navbar isBordered className="bg-zinc-900/70 backdrop-blur-md">
                <NavbarBrand>
                        <p className="font-bold text-white text-xl tracking-wider">LA CASA DE LAS TELAS</p>
                    </NavbarBrand>
                <NavbarContent className="flex gap-8" justify="center">
                    <NavbarItem>
                        <Link to="/" className="text-zinc-300 hover:text-white transition-colors">Inicio</Link>
                    </NavbarItem>

                    {isLoggedIn && (
                        <>
                            <NavbarItem>
                                <Link to="/admin" className="text-zinc-300 hover:text-white transition-colors">Admin</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link to="/contabilidad" className="text-zinc-300 hover:text-white transition-colors">Contabilidad</Link>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>

                <NavbarContent justify="end">
                    {!isLoggedIn ? (
                        <NavbarItem>
                            <Button as={Link} to="/ingreso" color="primary" variant="flat">
                                Ingreso
                            </Button>
                        </NavbarItem>
                    ) : (
                        <NavbarItem>
                            <Button
                                color="danger"
                                variant="light"
                                onClick={() => setIsLoggedIn(false)}
                            >
                                Salir
                            </Button>
                        </NavbarItem>
                    )}
                </NavbarContent>
            </Navbar>
                <main className='flex-grow'> 
            <Routes>
                <Route path='/' element={<Catalogo
                    inventario={inventarioFiltrado}
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    //onVender={venderMetro}
                />} />
                <Route
                    path='/ingreso'
                    element={<Ingreso onLogin={setIsLoggedIn} />} />
                <Route path='/admin' element={isLoggedIn ? <Admin
                    inventario={inventario}
                    onAgregar={agregarTela}
                    onEliminar={eliminarTela}
                    onEditar={editarTela}
                //onReponer={reponerTodo}
                />
                    : <Navigate to="/ingreso" />}
                />

                <Route
                    path='/contabilidad' element={isLoggedIn ? <Contabilidad
                        inventario={inventario}
                        ventas={ventas}
                        onRegistrarVenta={registrarVentaManual}
                        onEliminarVenta={eliminarVenta}
                    /> : <Navigate to="/ingreso" />
                    }
                />
                    </Routes>
                </main>
            <BotonWhatsApp />
                <Footer />

            </BrowserRouter>
        </div>
    )
}
 
// const styles = {
//     nav: { backgroundColor: '#424242', padding: '10px', display: 'flex', gap: '15px' },
//     link: { color: 'white', textDecoration: 'none', fontWeight: 'bold' }
// } 


export default App;