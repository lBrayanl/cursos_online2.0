const pool = require("../conexion");
const conexionModelo = require("../modelo");
const bcrypt = require('bcrypt');

//********************************************** */
const usuario = async (req, res, next) => {
    try {
      const { nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,password} = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUsuario = await pool.query(
        `INSERT INTO usuarios (nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,password) VALUES ($1, $2,$3, $4,$5,$6,$7,$8,$9)`,
        [nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero ,correo,hashedPassword]);

      console.log(newUsuario);
      res.json(newUsuario.rows[0])

    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  //********************************************** */
  
  const getUsuario = async (req, res, msg) => {
    try {

      // Se obtiene el usuario a consultar
      const usuarioObtener = req.params.usuario;
      const allUsuario = await pool.query("SELECT * FROM usuarios");

      // Se declara "datos" como un objeto para enviar la informacion de los cursos y el usuario
      var datos = {};
      datos['infoUsuario'] = allUsuario.rows;
      return res.json(datos);

    } catch (error) {
      msg(error ," verificar");
      return console.log(error);
    }
  };


  //--------------------------------------------------------------------------/
  

  //********************************************** */
  const login = async (req,res,msg) =>{
    const { correo, password } = req.body;
    if(!correo || !password){
        res.json({Message:"Debe ingresar el usuario y la contraseña"});
    }
    conexionModelo.login(correo,password)
    .then(existe=>{
        if(existe[0]){
          // Se envia el id del usuario logeado para buscar la informacion de el y sus cursos
          req.params.usuario = existe[0].ingreso;
          // Se llama a la funcion para consultar los datos del usuario.
          getUsuario(req, res, msg);
        }else{
          var datos = {};
          datos['infoUsuario'] = null;
          return res.json(datos);
        }
    })
    .catch(err=>{
        res.json({Message:"Eror en la consulta: "+err.message});
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
    const { usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado} = req.body;
    if(!usuarios_user_id || !cursos_id_cursos || !avance || !horasvistas || !nivel_aprendizaje || !nota || !sw_estado){
      res.json({Message:"Faltan datos!!"});
    }
    conexionModelo.inscripcion(usuario)
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

  module.exports = {
    usuario,
    getUsuario,
    login,
    obtenerCurso,
    cursosUser,
    inscripcionContoler
  };