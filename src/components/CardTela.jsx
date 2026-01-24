const CardTela = ({ nombre, stock, precio, onVender, onEliminar, showAdmin, onPrepararEdicion }) => {
    const styles = {
        card: {
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '15px',
            width: '250px',        // Ancho fijo para todas
            minHeight: '300px',    // Altura mínima para que no se deformen
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Empuja los botones hacia abajo
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backgroundColor: '#161616',
            color: '#e0e0e0',
            
        },
        estiloStock: {
            color: stock < 3 ? 'red' : 'white',
            fontWeight: stock < 3 ? 'bold' : 'normal'
        }
    };

    const estiloBoton = { backgroundColor: stock === 0 ? 'gray' : 'green' };
    return (
        <div style={styles.card}>
            <h3>{nombre}</h3>
            {stock < 3 && stock > 0 && <p style={{ color: 'orange', fontWeight: 'bold' }}>¡Últimos metros!</p> }
            
            {stock > 0 && (<p>Stock: <span style={styles.estiloStock}>{stock}</span></p>)}
           
            {stock > 0 && (<p>Precio: ${precio}</p>)}
            
            {stock == 0 && <p style={{ color: 'red', fontWeight: 'bold' }}>¡Sin Stock!</p>}
            
            

           {!showAdmin && ( 
            <button style={estiloBoton} onClick={onVender} disabled={stock === 0}>
                {stock === 0 ? <p>No Hay Stock</p> : <p>Vender 1 metro</p>}
                </button>) }

            
            {showAdmin && (
                <button onClick={onPrepararEdicion}
                    style={{ backgroundColor: '#460bb3', color: 'white', marginLeft: '10px' }}>
                    Editar
                </button>
            )}
            
            {showAdmin && (
                <button onClick={onEliminar}
                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>
                    Eliminar
            </button>
            )}
        </div>
    );
};



export default CardTela;