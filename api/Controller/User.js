const pool = require("../conexion");
const conexionModelo = require("../Model/modelo");
const bcrypt = require('bcrypt');
const cloudinary = require("../cloudinary");

//********************************************** */
const nuevo_Usuario = async (req, res, next) => {
    const { nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    conexionModelo.nuevoUsuario(nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,hashedPassword)
    .then(existe=>{
        return res.json(existe);
    })
    .catch(err=>{
        return res.json({Message:"Eror en la consulta: "+err.message});
    })
  };

  //********************************************** */
  
  const getUsuario = async (req, res, msg) => {
    // Se obtiene el usuario a consultar
    const usuarioObtener = req.params.usuario;

    conexionModelo.obtener(usuarioObtener)
    .then(existe=>{
      return res.json(existe);
    })
    .catch(err=>{
        return res.json({Message:"Eror en la consulta: "+err.message});
    })
  };


  //--------------------------------------------------------------------------/
  

  //********************************************** */
  const _login = async (req,res,msg) =>{
    const { correo, password } = req.body;
    if(!correo || !password){
        return res.json({Message:"Debe ingresar el usuario y la contraseña"});
    }
    conexionModelo.login(correo,password)
    .then(existe=>{
        if(existe[0]){
          // Se envia el id del usuario logeado para buscar la informacion de el y sus cursos
          req.params.usuario = existe[0].usuarios_user_id;
          // Se llama a la funcion para consultar los datos del usuario.
          getUsuario(req, res, msg);
        }else{
          var datos = {};
          datos['infoUsuario'] = null;
          return res.json(datos);
        }
    })
    .catch(err=>{
        return res.json({Message:"Eror en la consulta: "+err.message});
    })
  };

  //********************************************** */
  const obtenerCurso = async (req,res,msg) =>{
    conexionModelo.octenerCursos()
    .then(existe=>{
        if(existe[0]){
          // Se envia la informacion consultada
          return res.json(existe);
        }else{
          return res.json({Message:"No se encontraron datos"});
        }
    })
    .catch(err=>{
        res.json({Message:"Eror en la consulta: "+err.message});
    })
  };
  //********************************************** */
  // Se consultan los cursos asociados al usuario
  const cursosUser = async (req,res,msg) =>{

    // Se obtiene el parametro del usuario logeado
    const usuario = req.params.usuario;

    // Se llama el modelo, para realizar la consulta
    conexionModelo.cursosRelacionados(usuario)
    .then(existe=>{ // "Existe" Informacion obtenida de la BDD
        if(existe[0]){
          // Se envia la informacion consultada
          return res.json(existe);
        }else{
          return res.json({Message:"No se encontraron datos"});
        }
    })
    .catch(err=>{ // Se envia el mensaje, por si hay error en la consulta
        res.json({Message:"Eror en la consulta: "+err.message});
    })
  }

  //************************************************ */

  // Incrision 

  const inscripcionContoler = async (req,res,msg) =>{
    const { usuarios_user_id,cursos_id_cursos,nivel_aprendizaje,sw_estado} = req.body;
    if(!usuarios_user_id || !cursos_id_cursos || !nivel_aprendizaje || !sw_estado){
      res.json({Message:"Faltan datos!!"});
    }
    conexionModelo.inscripcion(usuarios_user_id, cursos_id_cursos, nivel_aprendizaje)
    .then(existe=>{ // "Existe" Informacion obtenida de la BDD
        if(existe){
          // Se envia la informacion consultada
          return res.json(existe);
        }else{
          return res.json({Message:"No se encontraron datos"});
        }
    })
    .catch(err=>{ // Se envia el mensaje, por si hay error en la consulta
        res.json({Message:"Eror en la consulta: "+err.message});
    })
  }

  //********************************************************** */

  // Datos de los cursos

  const datosCursos = async(req,res,msg) =>{
    const id_cursos = req.params.curso;
    if(!id_cursos){
      res.json({Message:"Falta el id_curso!!"});
    }
    conexionModelo.dataCursos(id_cursos)
    .then(existe=>{ // "Existe" Informacion obtenida de la BDD
      if(existe){
        // Se envia la informacion consultada
        return res.json(existe);
      }else{
        return res.json({Message:"No se encontraron registros en este curso"});
      }
    })
    .catch(err=>{ // Se envia el mensaje, por si hay error en la consulta
        res.json({Message:"Eror en la consulta: "+err.message});
    })
  }

  //******************************************************* */

  // Info del curso 

  const informacionCurso = async(req,res,msg) =>{
    const id_cursos = req.params.curso;
    if(!id_cursos){
      res.json({Message:"Falta el id_curso!!"});
    }
    conexionModelo.infoCurso(id_cursos)
    .then(existe=>{ // "Existe" Informacion obtenida de la BDD
      if(existe){
        // Se envia la informacion consultada
        req.params.infoCurso = existe;
        req.params.id_curso = id_cursos;
        obtenerVideo(req, res, msg);
      }else{
        return res.json({Message:"No se encontro el curso"});
      }
    })
    .catch(err=>{ // Se envia el mensaje, por si hay error en la consulta
        res.json({Message:"Eror en la consulta: "+err.message});
    })
  }

  //************************************************************ */

  //Prueba Obtener video 

  const obtenerVideo = async(req,res)=>{
    const curso_id = req.params.id_curso;
    const infoCurso = req.params.infoCurso;
    cloudinary.obtenerVideo(curso_id)
    .then(existe=>{ // "Existe" Informacion obtenida de la BDD
      if(existe){
        var datos = { infoCurso: [], videos: [] };
        datos.infoCurso.push(infoCurso);
        for (let index = 0; index < existe.total_count; index++) {
          if (existe.resources[index] && existe.resources[index].context && curso_id == existe.resources[index].context.idcursos) {
            datos.videos.push({orden_id: existe.resources[index].context.order, nombre: existe.resources[index].filename, src: existe.resources[index].url}); 
          }
        }
        return res.json(datos);
      }else{
        return res.json({Message:"No se encontro algun video"+existe});
      }
    })
    .catch(err=>{ // Se envia el mensaje, por si hay error en la consulta
        res.json({Message:"Eror: "+err.message});
    })
  }
  module.exports = {
    nuevo_Usuario,
    getUsuario,
    _login,
    obtenerCurso,
    cursosUser,
    inscripcionContoler,
    datosCursos,
    informacionCurso,
    obtenerVideo
  };