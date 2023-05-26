import React, { Component, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/estilos.css'

const user_id = window.localStorage.getItem("user_id");

const Inscrito = () => {
  const [cursosUsuario, setCursosUsuario] = useState([]);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/cursoUser/" + user_id)
      .then((res) => res.json())
      .then((cursosUser) => {
        if (cursosUser) {
          setCursosUsuario(cursosUser);
        } else {
          throw new Error("No hay cursos");
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setApiCallCompleted(true);
      });
  }, []);

  
    if (!Array.isArray(cursosUsuario) || !cursosUsuario.length) {
      return (
        <div>
          <p>No hay cursos disponibles</p>
        </div>
      );
    } else {
      return (
        <div className="containerCurso" style={{ display: 'flexWrap ', overflowX: 'auto' }}>
          {cursosUsuario.map((curso) => (
            <div  key={curso.cursos_id}  style={{ flex: '0 0 calc(100vw / 3)', padding: '4px' }}>
            <Card style={{ width: '100%', height: '19%' }}>
              <div style={{ display: 'flex' }}>
                <Card.Img variant="top" className='imgCard' src={curso.imagen} style={{ width: '40%', height: '70%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '70%' }}>
                  <Card.Body>
                    <Card.Title>{curso.nombre_curso}</Card.Title>
                    <Card.Text>{curso.profesor}</Card.Text>
                    <Card.Text>
                      <label htmlFor="radio1">★</label>
                      <label htmlFor="radio2">★</label>
                    </Card.Text>
                    <Card.Text>{curso.idioma}</Card.Text>
                    <Card.Text>Duración: {curso.horasvideo}</Card.Text>
                    <Card.Text>${curso.valor}</Card.Text>  
                      <Button variant="primary" href={`/curso/${curso.cursos_id}`}>Ver</Button>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
        ))}
        </div>
      );
    }
  
}
export default Inscrito;