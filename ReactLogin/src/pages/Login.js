import React, { useState, useEffect, useContext } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
      
    const handleChange = (e) => {
        if (e.target.name === 'usuario') {
            setUsuario(e.target.value);
        } else if (e.target.name === 'contrasena') {
            setContrasena(e.target.value);
        }
    };

    const crearUsuario = () => {
        window.location.href="./formulario";
    };

    const SessionDataStorage = (e) => {
        e.preventDefault();
        localStorage.setItem("usuario", usuario);
        //console.log(usuario);
    };

    const login = () => {
        //fetch("/login/"+usuario+"/"+contrasena)
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ correo: usuario, password: contrasena })
          })
            .then((res)=>res.json())
            .then((data)=>{
                // En "data" esta toda la informacion del usuairo y sus cursos
                if(data.infoUsuario){
                    const infoUsuario0 = data.infoUsuario[0];;
                    const user_id = infoUsuario0.user_id;
                    localStorage.setItem("user_id", user_id);   
                    window.location.href="./";
                }else{
                    alert("El usuario y la constraseña es incorrecta!");
                }
            });
    };
    
    return (
        
        <div className="containerPrincipal">
            <div className="containerCa">
                <header className="head-form">
                    <h2>CursosON</h2>
                    <p>Ingrese su usuario y contraseña!</p>
                </header>
                <form className="form-group" onSubmit={SessionDataStorage}>
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="usuario"
                        value={usuario}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="contrasena"
                        value={contrasena}
                        onChange={handleChange}
                    />
                        
                    <br />
                
                    <button variant="primary" className='iniciar' type="submit" onClick={login}>Iniciar Sesión</button>
                </form>
                <div className="other">
                   
                    <button variant="primary"  onClick={crearUsuario}>Crear Usuario
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;