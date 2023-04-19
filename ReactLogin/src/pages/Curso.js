import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer  from '../pages/footer';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import MenuPrincipal from '../pages/MenuPrincipal';


const Curso = (props) => {
  const [cursosUsers, setCursosUsuario] = useState([]);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();


  const examen = () => {
    window.location.href = "./quiz";
  };

  // En la consola del navegador puedes ver la informacion al iniciar sesion
  useEffect(() => {
   // fetch("/cursoUser/${props.id}"+id )
   fetch("/cursoUser/"+id )
      .then((res) => res.json())
      .then((cursosUser) => {
        if (cursosUser) {
          setCursosUsuario(cursosUser);
          console.log(cursosUser)
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
  }, [props.id]);

  if (!Array.isArray(cursosUsers) || !cursosUsers.length) {
    return (
      <div>
        <p>No hay cursos disponibles</p>
      </div>
    );
  } else {
  return (
    <div> 
      
      <MenuPrincipal/>
       {cursosUsers.map((curso) => (
        <div key={curso.cursos_id}>
        <h3>{curso.nombre_curso}</h3>
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
              alt="..."
            />
          </div>
          <div className="col-lg-5">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header style={{ color: "black" }}>
                Accordion Item #1
                </Accordion.Header>
                <Accordion.Body>
                <Table striped>
                    <thead>
                    <tr>
                        <th>1.Introducción al curso</th>
                    </tr>
                    </thead>
                </Table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                <Table striped>
                    <thead>
                    <tr>
                        <th></th>
                    </tr>
                    <tr>
                        <th>3.Instalar el framework</th>
                    </tr>
                    <tr>
                        <th>5.Componentes y plantillas</th>
                    </tr>
                    </thead>
                </Table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Examen</Accordion.Header>
                <Accordion.Body>
                <button
                    className="btn submits frgt-pass"
                    onClick={examen}
                >
                    Realizar examen
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                </button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
          </div>
          <div className="col-lg-5">
            <p>Aprende lo básico de Angular 13 desde cero y paso a paso con Víctor Robles WEB. Instalación, componentes, eventos y más</p>
          </div>
        </div>
        </div>
       ))}
    <Footer/>
    </div>
  );}
};

export default Curso;