import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuscarCurso from '../pages/BuscarCurso';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Inscrito from '../pages/Inscrito';

const Cards = () => {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [actualizarContenido, setActualizarContenido] = useState(false);

  

  const handleActualizarContenido = () => {
    setActualizarContenido(!actualizarContenido);
  };

  return (
    <div className="containerCurso">
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#buscar">
            <Nav.Item>
              <Nav.Link href="#buscar" onClick={handleActualizarContenido}>
                Buscar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#inscrito" onClick={handleActualizarContenido}>
                Inscrito
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {actualizarContenido && !isLoggedIn ?  <Inscrito />:<BuscarCurso /> }
        </Card.Body>
      </Card>
    </div>
  );
};
      
export default Cards;