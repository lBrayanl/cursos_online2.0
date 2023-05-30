import React, { Component, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";
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
      });
      
      const isLoggedIn = localStorage.getItem("user_id");
      if (isLoggedIn) {
        this.setState({ isLoggedIn: true });
      }
  }
  handleEnroll = (key) => {
    // verificar usuario logueado
    const isLoggedIn = localStorage.getItem("user_id");
    if (!this.state.isLoggedIn) {
      //direccionar usuario login
      this.setState({ redirect: true });
    } else {
      //console.log(isLoggedIn,key )
      fetch("/inscripcion", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ usuarios_user_id:isLoggedIn,cursos_id_cursos:key,nivel_aprendizaje:'Avanzado',sw_estado:1 })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
          // data = 1 se registro con exito
          if(data == 1){
            alert("Inscrito con exito!!!");
          }else if(data == "Ya existe este curso"){
            alert("Ya tienes inscrito el curso!!");
          }else{
            alert("Algo salio mal!!");
          }
      });
    }
  };
  render() {
    const { cursos, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    } else if (!Array.isArray(cursos) || !cursos.length) {
      return (
        <div>
          <p>No hay cursos disponibles</p>
        </div>
      );
    } else {
      return (
         <div className="containerCurso" style={{ display: 'flexWrap ', overflowX: 'auto' }}>
          {cursos.map((curso) => (
            <div key={curso.cursos_id} style={{ flex: '0 0 calc(100vw / 3)', padding: '4px' }}>
              <Card style={{ width: '100%', height: '29%' }}>
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
                      <Button variant="primary" onClick={() => this.handleEnroll(curso.cursos_id, curso.lvlcurso)}>
                        Inscribirse
                      </Button>
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
}
export default BasicExample;