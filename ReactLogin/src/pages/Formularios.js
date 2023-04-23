import React, {useState} from 'react';
import { Formulario, Label, ContenerTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from '../componentes/formVista'; 
import {faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../componentes/input';
import MenuPrincipal from '../pages/MenuPrincipal';
import Footer from '../pages/footer';


const Formularios = () => {
  const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
  const [nombre1, cambiarNombre1] = useState({campo: '', valido: null});
  const [nombre2, cambiarNombre2] = useState({campo: '', valido: null});
  const [apellido1, cambiarApellido1] = useState({campo: '', valido: null});
  const [apellido2, cambiarApellido2] = useState({campo: '', valido: null});
  const [password, cambiarPassword] = useState({campo: '', valido: null});
  const [password2, cambiarPassword2] = useState({campo: '', valido: null});
  const [correo, cambiarCorreo] = useState({campo: '', valido: null});
  const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
  const [edad, cambiarEdad] = useState({campo: '', valido: null});
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const [genero, cambiarGenero] = useState({campo: '', valido: null});

  const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		nombre1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    nombre2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    genero: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    edad: /^\d{1,2}$/ // 1 a 2 numeros.

	}

  const validarPassword2 = () =>{
    if(password.campo.length > 0){
      if(password.campo !== password2.campo){
        cambiarPassword2((prevState) => {
            return {...prevState, valido: 'false'}
        });
      } else {
          cambiarPassword2((prevState) => {
            return {...prevState, valido: 'true'}
          });
        }
    }
      
  }

const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);

}

const onSubmit = (e) => {
    e.preventDefault();

    if(
        usuario.valido === 'true' &&
        nombre1.valido === 'true' &&
        nombre2.valido === 'true' &&
        apellido1.valido === 'true' &&
        apellido2.valido === 'true' &&
        genero.valido === 'true' &&
        password.valido === 'true' &&
        password2.valido === 'true' &&
        correo.valido === 'true' &&
        telefono.valido === 'true' &&
        edad.valido === 'true' &&
        terminos
      ){
        // Inicia el envio de informacion a la API para su insert.
        fetch("http://localhost:4000/nuevoUsuario", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          
          // Por favor ingresar los datos del formulario en ese orden nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,password
          // Aun no no probe esto pero puede que funcione como esta, si no, toca que lo mires.
          body: JSON.stringify({ nombre_1:nombre1.campo,nombre_2:nombre2.campo,apellido_1:apellido1.campo, apellido_2:apellido2.campo, sw_estado:1,edad:edad.campo,genero:genero.campo,correo:correo.campo,password:password.campo })
        })
        .then((res)=>res.json())
        .then((data)=>{
            // En "data" esta la informacion de si fue o no, exitoso.
            console.log(data);
        });
        cambiarFormularioValido(true);
        cambiarUsuario({campo: '', valido: ''});
        cambiarNombre1({campo: '', valido: null});
        cambiarNombre2({campo: '', valido: null});
        cambiarGenero({campo: '', valido: null});
        cambiarApellido1({campo: '', valido: null});
        cambiarApellido2({campo: '', valido: null});
        cambiarPassword({campo: '', valido: null});
        cambiarPassword2({campo: '', valido: 'null'});
        cambiarCorreo({campo: '', valido: null});
        cambiarTelefono({campo: '', valido: null});
        
      }else{
        cambiarFormularioValido(false);
      }
    }



return (
  <div className='container'>
        <MenuPrincipal/>
        <br/>
        <div className="containerPrincipal">

          <main>
            <Formulario action="" onSubmit={onSubmit} >
                <Input
                  estado={usuario}
                  cambiarEstado={cambiarUsuario}
                  tipo="text"
                  label="Usuario"
                  placeholder="Introduce tu nombre"
                  name="user_id"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.usuario}
                />

                <Input
                  estado={telefono}
                  cambiarEstado={cambiarTelefono}
                  tipo="text"
                  label="Telefono"
                  placeholder="Introduce tu telefono"
                  name="telefono"
                  leyendaError="Este campo solo debe tener numeros y maximo 10 numeros"
                  expresionRegular={expresiones.telefono}
                />

                <Input
                  estado={nombre1}
                  cambiarEstado={cambiarNombre1}
                  tipo="text"
                  label="Nombre 1"
                  placeholder="Introduce tu nombre"
                  name="nombre_1"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.nombre1}
                />  

                <Input
                  estado={nombre2}
                  cambiarEstado={cambiarNombre2}
                  tipo="text"
                  label="Nombre 2"
                  placeholder="Introduce tu segundo nombre"
                  name="nombre_2"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.nombre2}
                /> 

                <Input
                  estado={apellido1}
                  cambiarEstado={cambiarApellido1}
                  tipo="text"
                  label="Apellido 1"
                  placeholder="Introduce tu primer apellido"
                  name="apellido_1"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.apellido1}
                />

                 <Input
                  estado={apellido2}
                  cambiarEstado={cambiarApellido2}
                  tipo="text"
                  label="Apellido 2"
                  placeholder="Introduce tu segundo apellido"
                  name="apellido_2"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.apellido2}
                />

                <Input
                  estado={password}
                  cambiarEstado={cambiarPassword}
                  tipo="password"
                  label="Contraseña"
                  placeholder="Introduce una contraseña"
                  name="password1"
                  leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
                  expresionRegular={expresiones.password}
                />
                
                <Input
                  estado={password2}
                  cambiarEstado={cambiarPassword2}
                  tipo="password"
                  label="Repetir contraseña"
                  placeholder="Escribe la contraseña"
                  name="contraseña"
                  leyendaError="Ambas contraseñas deben coincidir"
                  funcion={validarPassword2}
                />

                <Input
                  estado={edad}
                  cambiarEstado={cambiarEdad}
                  tipo="text"
                  label="Edad"
                  placeholder="Introduce tu edad"
                  name="edad"
                  leyendaError="Este campo solo debe tener numeros y maximo 2 numeros"
                  expresionRegular={expresiones.edad}
                />

                <Input
                  estado={correo}
                  cambiarEstado={cambiarCorreo}
                  tipo="email"
                  label="Correo"
                  placeholder="Introduce tu correo"
                  name="correo"
                  leyendaError="Correo invalido"
                  expresionRegular={expresiones.correo}
                />

                <Input
                  estado={genero}
                  cambiarEstado={cambiarGenero}
                  tipo="text"
                  label="Genero"
                  placeholder="Introduce tu genero"
                  name="genero"
                  leyendaError="Solo letras y espacios, no puede llevar ningun caracter especial como ,-"
                  expresionRegular={expresiones.genero}
                />
                
                
              
              <ContenerTerminos>
                <Label>
                  <input 
                    type="checkbox" 
                    name="terminos" 
                    id="terminos" 
                    checked={terminos}
                    onChange={onChangeTerminos}
                  />
                    Acepto los Terminos y Condiciones
                </Label>  
              </ContenerTerminos>

                {formularioValido === false && <MensajeError>
                    <p>
                      <FontAwesomeIcon icon={faExclamationTriangle}/>
                      <b>Error:</b> Por favor rellena el formulario correctamente.
                    </p>
                </MensajeError>}

              <ContenedorBotonCentrado>
                  <Boton type="submit">Enviar</Boton>
                  {formularioValido === true && <MensajeExito>Formulario enviado exitosamente.</MensajeExito>}
              </ContenedorBotonCentrado>

            </Formulario>
          </main>
          </div>
          <br/><br/>
           <Footer/>
  </div>
 
 );

}

export default Formularios;