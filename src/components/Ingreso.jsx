import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ingreso = ({ onLogin }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user === "admin2026" && pass === "telas2026") {
            onLogin(true);
            navigate("/")
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Acceso Administrativo</h2>
                <input type="text" placeholder="Usuario" onChange={e => setUser(e.target.value)} style={styles.input} />
                <input type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} style={styles.input} />
                <button type="submit" style={styles.button}>Entrar</button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', marginTop: '100px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd' },
    button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Ingreso;