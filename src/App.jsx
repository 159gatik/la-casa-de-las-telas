import { db } from './firebase'; // El archivo que creamos recién
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Catalogo from './pages/Catalogo.jsx';
import Admin from './pages/Admin.jsx';
import Contabilidad from './pages/Contabilidad.jsx';
import Ingreso from './components/Ingreso.jsx'

function App() {
    const [inventario, setInventario] = useState([]);

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




    // Estado para el historial de ventas
    const [ventas, setVentas] = useState(() => {
        const guardadas = localStorage.getItem("ventas_telas");
        return guardadas ? JSON.parse(guardadas) : [];
    });

    // Guardar en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("ventas_telas", JSON.stringify(ventas));
    }, [ventas]);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Función para registrar la venta manual
    const registrarVentaManual = (nuevaVenta) => {
        setVentas([...ventas, { ...nuevaVenta, id: Date.now() }]);
    };

    const eliminarVenta = (id) => {
        const nuevoHistorial = ventas.filter(v => v.id !== id);
        setVentas(nuevoHistorial);
    };

    const venderMetro = (id) => {
        const nuevoInventario = inventario.map(tela => {
            if (tela.id === id && tela.stock > 0) {
                return { ...tela, stock: tela.stock - 1 };
            }
            return tela;
        })
        setInventario(nuevoInventario);
    }

    const reponerTodo = () => {
        const nuevoInventario = inventario.map(tela => {
            return { ...tela, stock: tela.stockInicial };
        });
        setInventario(nuevoInventario);
    }
    
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

    const eliminarTela = (id) => {
        const nuevoInventario = inventario.filter (tela => tela.id !== id)
    setInventario(nuevoInventario)
    }

    const editarTela = (id, datosActualizados) => {
        const nuevoInventario = inventario.map(tela =>
            tela.id === id ? { ...tela, ...datosActualizados } : tela)
        setInventario(nuevoInventario)
    }
    return (
        <BrowserRouter>
            <nav style={styles.nav} isLoggedIn={isLoggedIn}>
                <Link to="/" style={styles.link}>Inicio</Link>
                {!isLoggedIn && (<Link to="/ingreso" style={styles.link}>Ingreso</Link>)}



                {isLoggedIn && (<> 
                <Link to="/admin" style={styles.link}>Admin</Link>
                <Link to="/contabilidad" style={styles.link}>Contabilidad</Link>

                    <button onClick={() => setIsLoggedIn(false)}>Salir</button>
                </>)}
            </nav>
        
            <Routes>
                <Route path='/' element={<Catalogo
                    inventario={inventario}
                    onVender={venderMetro}
                />} />
                <Route
                    path='/ingreso'
                    element={<Ingreso onLogin={setIsLoggedIn} />} />
                <Route path='/admin' element={isLoggedIn ? <Admin
                    inventario={inventario}
                    onAgregar={agregarTela}
                    onEliminar={eliminarTela}
                    onEditar={editarTela}
                    onReponer={reponerTodo} />
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
        </BrowserRouter>
    )
}
 
const styles = {
    nav: { backgroundColor: '#424242', padding: '10px', display: 'flex', gap: '15px' },
    link: { color: 'white', textDecoration: 'none', fontWeight: 'bold' }
} 


export default App;