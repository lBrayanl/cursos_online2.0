import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css'
import MenuPrincipal from '../pages/MenuPrincipal';
import Footer from '../pages/footer';
import Cards from '../pages/Cards';
import CarouselCurso from '../pages/CarouselCurso';
import FiltroCursos from '../pages/FiltroCursos';

class Inicio extends Component {
    
    render() {
       
        return (
            <div>
                 <MenuPrincipal/>
                <div className='containerSecundario'>                    
                    <br/>
                    <h4>Cursos para dar tus primeros pasos en Programación</h4>
                    <Cards/><br/>
                    {/*<h3>Cursos destacados</h3>
                    <br/>
                    <CarouselCurso/>
                    <br/>
                    <h3>Todos los cursos</h3>
                    <FiltroCursos/><br/>*/}
                </div>
                <Footer/>
            </div>
            
        );
    }
}

export default Inicio;