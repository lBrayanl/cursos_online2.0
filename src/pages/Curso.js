import React, { useEffect, useState , useRef} from "react";
import { useParams } from 'react-router-dom';
import '../css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer  from '../pages/footer';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import MenuPrincipal from '../pages/MenuPrincipal';
import Quiz from '../pages/Quiz';

const Curso = (props) => {
  const [cursosUsers, setCursosUsuario] = useState({infoCurso: []});
  const [videoInfo, setVideoInfo] = useState([]);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const examen = () => {
    window.location.href = "./quiz";
  };

  // En la consola del navegador puedes ver la informacion al iniciar sesion
  useEffect(() => {
    fetch("/infoCurso/"+id )
      .then((res) => res.json())
      .then((cursosUser) => {
        console.log(cursosUser);
        if (cursosUser) {
          setCursosUsuario(cursosUser.infoCurso[0]);
          setVideoInfo(cursosUser.videos);
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
  }, [id]);

  const videoRef = useRef(null);

  const handlePlay = () => {
    if (!document.pictureInPictureElement) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  if (!Array.isArray(cursosUsers) || !cursosUsers.length) {
    return (
      <div>
        <p>No hay cursos disponibles</p>
      </div>
    );
  } else {
  return (
    <div >
      <MenuPrincipal/>
      <div className="container"> 
      <div className="containerCurso"> 
      {cursosUsers.map((curso) => (
       <div key={curso.cursos_id}>
        <br/>
       <h3>{curso.nombre_curso}</h3>
       <div className="row gx-4 gx-lg-5 align-items-center my-5">
       <div className="col-lg-8">
        <img variant="top" className='imgCard' src={curso.imagen} style={{ width: '50%', height: '70%' }} />
        </div>
        <div className="col-lg-4" style={{ textAlign: 'left' }}>
          <h3>{curso.descripcion}</h3>
          <div className="mb-3">
            <p><strong>Profesor: </strong>{curso.profesor}</p>
          </div>
          <div className="mb-3">
            <p><strong>Idioma: </strong>{curso.idioma}</p>
          </div>
          <div className="mb-3">
            <p><strong>Duración: </strong>{curso.horasvideo}</p>
          </div>
          <div className="mb-3">
            <p><strong>Nivel:</strong>{curso.lvlcurso}</p>
          </div>
          <div className="mb-3">
            <p><strong>Valor: $</strong>{curso.valor}</p>
          </div>
        </div>
        
      </div>

         <div className="row gx-4 gx-lg-5 align-items-center my-5">
         <Accordion defaultActiveKey="0">
           <Accordion.Item eventKey="0">
               <Accordion.Header style={{ color: "black" }}>
              Contenido del curso
               </Accordion.Header>
               <Accordion.Body>
               <Table striped>
               <thead>
                 <tr>
                   <th>Nombre</th>
                   <th>Video</th>
                 </tr>
               </thead>
                 <tbody>
                 {Array.isArray(videoInfo) && videoInfo.length > 0 ? (
                  videoInfo.sort((a, b) => a.orden_id - b.orden_id).map((video) => (
                    <tr key={video.orden_id}>
                      <td>{video.nombre}</td>
                      <td>
                        <video width="440" src={video.src} height="100" controls ref={videoRef}></video><br></br>
                        <button onClick={handlePlay}>Ver Video</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No hay videos disponibles</td>
                  </tr>
                )}
                 </tbody>
               </Table>
               </Accordion.Body>
           </Accordion.Item>
          
           <Accordion.Item eventKey="2">
               <Accordion.Header>Examen</Accordion.Header>
               <Accordion.Body>
                    <Quiz/>
               </Accordion.Body>
           </Accordion.Item>
       </Accordion>
        
       </div>
       </div>
      ))}
   </div>
   </div>
   <Footer/>

    </div>
   
  );}
};

export default Curso;
