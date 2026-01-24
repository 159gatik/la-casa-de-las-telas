const CardTela = ({ nombre, stock, precio, onEliminar, showAdmin, onPrepararEdicion }) => {
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
            boxShadow: '0 4px 6px rgba(12, 6, 6, 0.73)',
            backgroundColor: '#bbb998',
            color: '#1a1919',
            alignItems: 'center',    // 👈 Esto centra los elementos (h3, p, button) horizontalmente
            textAlign: 'center',
            
        },
        estiloStock: {
            color: stock < 3 ? 'red' : 'black',
            fontWeight: stock < 3 ? 'bold' : 'normal'
        }
    };

    //const estiloBoton = { backgroundColor: stock === 0 ? 'gray' : 'green' };
    return (
        <div style={styles.card}>
            <h3>{nombre}</h3>
            {stock < 3 && stock > 0 && <p style={{ color: 'red', fontWeight: 'bold' }}>¡Últimos metros!</p>}
            
            {stock > 0 && (<p>Stock: <span style={styles.estiloStock}>{stock}</span></p>)}
           

            
            {stock == 0 && <p style={{ color: 'red', fontWeight: 'bold' }}>¡Sin Stock!</p>}

            {showAdmin && (
                <span>
                    {stock > 0 && (<p>Precio: ${precio}</p>)}
                </span>
            )}


            
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