import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cursos from '../componentes/cursoMenu';
import '../css/Login.css'

function MenuPrincipal() {
  const [isLogged, setIsLogged] = useState(!!window.localStorage.getItem('usuario'));
  const history = useHistory();

  const handleIrAInicio = () => {
    // limpia la url para volver a la página de inicio
    history.replace("/");
  };
  const handleLogout = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('user_id');
    setIsLogged(false);
    history.replace('/');
  };

  const nombreBoton = isLogged ? 'Cerrar Sesión' : ' Login';
  const urlBoton = isLogged ? '/' : './login';
  const tituloNavDropdown = isLogged ? 'Avance Cursos' : '';

  return (
    <div>
      <Navbar>
          <Navbar.Brand href={handleIrAInicio}>CursosOnline</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a onClick={handleIrAInicio}>Inicio </a>
            </Navbar.Text>
            {isLogged && (
              <Navbar.Text>
                <NavDropdown id="nav-dropdown-dark-example" title={tituloNavDropdown} menuVariant="dark">
                  <Cursos />
                </NavDropdown>
              </Navbar.Text>
            )}
            <Navbar.Text>
              <a href={urlBoton} onClick={isLogged ? handleLogout : undefined}>
                {nombreBoton}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MenuPrincipal;