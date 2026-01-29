
import CardTela from '../components/CardTela';

function Catalogo({ inventario, busqueda, setBusqueda }) {
    //const totalMetros = inventario.reduce((acc, tela) => acc + tela.stock, 0)
;
    return (
        <div style={{ padding: '20px' }}>
            <h1>La Casa de las Telas</h1>
            {/*<h2>Metros Totales en stock: {totalMetros} metros </h2>*/}
            <input
                type="text"
                placeholder="Buscar tela por nombre o color..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={styles.buscadorInput}
            />
            {busqueda && (
                <button onClick={() => setBusqueda("")} style={styles.botonLimpiar}>
                    X
                </button>
            )}
            <div style={styles.contenedorCards}>
                {inventario.length > 0 ? (inventario.map(tela => (
                    <CardTela
                        key={tela.id}
                        nombre={tela.nombre}
                        precio={tela.precio}
                        stock={tela.stock}
                        color={tela.color}
                        imagen={tela.imagen}
                        //onVender={() => onVender(tela.id)}
                        showAdmin={false}
                    />))) : (
                    // Si no hay ninguna que coincida, mostramos este aviso
                    <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                        <p>No se encontraron telas que coincidan con <strong>"{busqueda}"</strong></p>
                        <button onClick={() => setBusqueda("")} style={{ color: '#007bff', cursor: 'pointer', border: 'none', background: 'none', textDecoration: 'underline' }}>
                            Ver todas las telas
                        </button>
                    </div>
                )}

            </div>
        </div>

    )

    
}
const styles = {
    // ... tus otros estilos
    contenedorCards: {
        display: 'flex',      // Activa el modo flexible
        flexWrap: 'wrap',    // Si no entran más, saltan a la fila de abajo
        gap: '20px',         // Espacio entre cada tarjeta
        justifyContent: 'center', // Centra las tarjetas en la pantalla
        padding: '20px'
    },
    buscadorContainer: { marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px' },
    buscadorInput: { padding: '12px', width: '300px', borderRadius: '25px', border: '1px solid #ccc', fontSize: '16px' },
    botonLimpiar: { background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'red' }
};
export default Catalogo;