import React, { Component, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/estilos.css'

class BasicExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
    };
  }

  componentDidMount() {
    fetch("/obtenerCursos")
      .then((res) => res.json())
      .then((cursos) => {
        this.setState({ cursos: cursos });
        //console.log(cursos)
      });
  }

  render() {
    const { cursos } = this.state;
    if (!Array.isArray(cursos) || !cursos.length) {
      return (
        <div>
          <p>No hay cursos disponibles</p>
        </div>
      );
    } else {
      return (
        <div>
          {cursos.map((curso) => (
            <div className="containerCurso" key={curso.cursos_id}>
              <Card style={{ width: '18rem', padding: '4%' }}>
                <Card.Img variant="top" className='imgCard' src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" />
                <Card.Body>
                  <Card.Title>{curso.nombre_curso}</Card.Title>
                  <Card.Text>
                  {curso.profesor}
                  </Card.Text>
                  <Card.Text>
                    <label htmlFor="radio1">★</label>
                    <label htmlFor="radio2">★</label>
                  </Card.Text>
                  <Card.Text>
                  {curso.idioma}
                  </Card.Text>
                  <Card.Text>
                  Duración:{curso.horasvideo}
                  </Card.Text>
                  <Card.Text>
                  ${curso.valor}
                  </Card.Text>
                  <Button variant="primary" href="./curso">Inscribirse</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
    }
  }
}
export default BasicExample;