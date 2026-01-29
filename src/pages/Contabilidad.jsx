import React, { useState } from "react";

const Contabilidad = ({ inventario, onRegistrarVenta, ventas, onEliminarVenta }) => {
    
    const [formVenta, setFormVenta] = useState({
        fecha: '',
        telaId: '',
        metros: '',
        color: '',
        montoTotal: ''
    })
    const [mesFiltro, setMesFiltro] = useState('')

    const handleSubmitVenta = (e) => {
        e.preventDefault();
        const telaSeleccionada = inventario.find(t => String(t.id) === String(formVenta.telaId))
        if (!telaSeleccionada) {
            alert("No se encontró la tela seleccionada");
            return;
        }

        onRegistrarVenta({
            ...formVenta,
            telaId: telaSeleccionada.id,
            nombreTela: telaSeleccionada.nombre,
            montoTotal: Number(formVenta.montoTotal),
            color: telaSeleccionada.color || "Sin color",
            metros: Number(formVenta.metros)
        })
        setFormVenta({ fecha: '', telaId: '', metros: '', montoTotal: '', color: '' })
    }

    const ventasProcesadas = ventas
        .filter(v => {
            if (!mesFiltro) return true;
            return v.fecha.startsWith(mesFiltro);
        })
        .sort((a, b) => {
            return new Date(a.fecha) - new Date(b.fecha);
        })
    
    const totalRecaudado = ventasProcesadas.reduce((acc, v) => acc + v.montoTotal, 0)

    return (
        <div style={{ padding: '20px' }}>
            <h2>Registro Contable</h2>

            <form onSubmit={handleSubmitVenta} style={stylesContabilidad.form}>
                <input
                    type="date"
                    required
                    value={formVenta.fecha}
                    onChange={(e) => setFormVenta({ ...formVenta, fecha: e.target.value })}
                />

                <select
                    required
                    value={formVenta.telaId}
                    onChange={(e) => setFormVenta({ ...formVenta, telaId: e.target.value })}
                >
                    <option value="">Selecciona la Tela</option>
                    {inventario.map(tela => (
                        <option key={tela.id} value={tela.id}>{tela.nombre} {tela.color ? `(${tela.color})` : ''}</option>
                    ))}
                </select>


                <input
                    type="number"
                    placeholder="Metros vendidos"
                    value={formVenta.metros}
                    onChange={(e) => setFormVenta({ ...formVenta, metros: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Monto Total $"
                    value={formVenta.montoTotal}
                    onChange={(e) => setFormVenta({ ...formVenta, montoTotal: e.target.value })}

                />

                <button type="submit">Registrar Venta</button>
            </form>

            <hr />

            <div style={stylesContabilidad.headerReporte}>
                <h3>Historial de Ingresos</h3>

                {/* FILTRO DE MES */}
                <div style={stylesContabilidad.filtroContainer}>
                    <label>Filtrar por Mes: </label>
                    <input
                        type="month"
                        value={mesFiltro}
                        onChange={(e) => setMesFiltro(e.target.value)}
                    />
                    <button onClick={() => setMesFiltro("")} style={{ marginLeft: '10px' }}>Ver Todos</button>
                </div>
            </div>

            {/* RESUMEN DE DINERO */}
            <div style={stylesContabilidad.resumen}>
                <p>Ventas encontradas: <strong>{ventasProcesadas.length}</strong></p>
                <p>Total Recaudado: <strong style={{ color: 'green' }}>${totalRecaudado}</strong></p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ background: '#5f5f5f', textAlign: 'left' }}>
                        <th style={stylesContabilidad.th}>Fecha</th>
                        <th style={stylesContabilidad.th}>Producto</th>
                        <th style={stylesContabilidad.th}>Color</th>
                        <th style={stylesContabilidad.th}>Metros</th>
                        <th style={stylesContabilidad.th}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasProcesadas.map(v => (
                        <tr key={v.id} style={{ borderBottom: '1px solid #c5c5c5' }}>
                            <td style={stylesContabilidad.td}>{v.fecha}</td>
                            <td style={stylesContabilidad.td}>{v.nombreTela}</td>
                            <td style={stylesContabilidad.td}>{v.color}</td>
                            <td style={stylesContabilidad.td}>{v.metros}m</td>
                            <td style={stylesContabilidad.td}>${v.montoTotal}</td>
                            <td style={stylesContabilidad.td}>
                                <button
                                    onClick={() => {
                                        if (window.confirm("¿Seguro que quieres borrar este registro de venta?")) {
                                            onEliminarVenta(v.id)
                                        }
                                    }}
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
   
}
const stylesContabilidad = {
    form: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }
    ,
    headerReporte: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#686868',
        padding: '10px',
        borderRadius: '8px'
    },
    resumen: {
        backgroundColor: '#9fbea0',
        padding: '15px',
        borderRadius: '8px',
        margin: '15px 0',
        display: 'flex',
        gap: '20px',
        fontSize: '18px'
    },
    th: { padding: '12px', borderBottom: '2px solid #ddd' },
    td: { padding: '12px' }
};
export default Contabilidad;