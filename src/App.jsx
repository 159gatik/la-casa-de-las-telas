import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Catalogo from './pages/Catalogo.jsx';
import Admin from './pages/Admin.jsx';
import Contabilidad from './pages/Contabilidad.jsx';
import Login from './components/Login.jsx';

function App() {
    const [inventario, setInventario] = useState(() => {
        const datosGuardados = localStorage.getItem('inventarioTelas');

        return datosGuardados ? JSON.parse(datosGuardados) : [
            { id: 1, nombre: 'Algodón', stock: 10, precio: 500, stockInicial: 10 },
            { id: 2, nombre: 'Lino', stock: 5, precio: 800, stockInicial: 5 },
            { id: 3, nombre: 'Seda', stock: 6, precio: 1500, stockInicial: 6 },
            { id: 4, nombre: 'Denim', stock: 8, precio: 700, stockInicial: 8 },
        ];

    });
    useEffect(() => {
        localStorage.setItem('inventarioTelas', JSON.stringify(inventario));
    }, [inventario]);


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
    
    const agregarTela = (nueva) => {
        setInventario([...inventario, { ...nueva, id: Date.now() }]);
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
            <nav style={styles.nav} >
            <Link to="/" style={styles.link}>Inicio</Link>
                <Link to="/admin" style={styles.link}>Admin</Link>
                <Link to="/contabilidad" style={styles.link}>Contabilidad</Link>
            </nav>
        
            <Routes>
                <Route path='/' element={<Catalogo
                    inventario={inventario}
                    onVender={venderMetro}
                />} />
                <Route path='/admin' element={isLoggedIn ? <Admin
                    inventario={inventario}
                    onAgregar={agregarTela}
                    onEliminar={eliminarTela}
                    onEditar={editarTela}
                    onReponer={reponerTodo} />
                    : <Login onLogin={setIsLoggedIn} />}
                />

                <Route
                    path='/contabilidad' element={isLoggedIn ? <Contabilidad
                        inventario={inventario}
                        ventas={ventas}
                        onRegistrarVenta={registrarVentaManual}
                        onEliminarVenta={eliminarVenta}
                    /> : <Login onLogin={setIsLoggedIn} />
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