
import CardTela from '../components/CardTela';

function Catalogo({ inventario, onVender }) {
    //const totalMetros = inventario.reduce((acc, tela) => acc + tela.stock, 0)
;
    return (
        <div style={{ padding: '20px' }}>
            <h1>La Casa de las Telas</h1>
            {/*<h2>Metros Totales en stock: {totalMetros} metros </h2>*/}
            <div style={styles.contenedorCards }>
                {inventario.map(tela => (
                    <CardTela
                        key={tela.id}
                        nombre={tela.nombre}
                        precio={tela.precio}
                        stock={tela.stock}
                        color={tela.color}
                        imagen={tela.imagen}
                        onVender={() => onVender(tela.id)}
                        showAdmin={false}
                    />
                ))}
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
    }
};
export default Catalogo;