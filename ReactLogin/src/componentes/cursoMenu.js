import React from 'react';
import { useEffect, useState } from "react";
import '../css/estilos.css';

const user_id = window.localStorage.getItem("user_id")

const Cursos = () => {
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
        <ul>
        {cursosUsuario.map((curso) => (
          <li key={curso.cursos_id}>
            <a href={`./curso/`+user_id}>{curso.nombre_curso}</a>
          </li>
        ))}
      </ul>
    );
     }
  };
export default Cursos;