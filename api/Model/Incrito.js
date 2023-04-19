const pool = require("../conexion");


const inscripcion = async (req, res, next) => {
    try {
      const { usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado} = req.body;

      const inscritos = await pool.query(
        `INSERT INTO inscritos (usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado) VALUES ($1, $2,$3, $4,$5,$6,$7)`,
        [usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado]);

      console.log(inscritos);
      res.json(inscritos.rows[0])

    } catch (error) {
      next(error);
      console.log(error);
    }
  };
  const GetInscrito = async (req, res, msg) => {
    try {

      // Se obtiene el usuario a consultar
      const incrito = req.params.usuario;
      const allInscrito = await pool.query("SELECT * FROM inscritos");

      var datos = {};
      datos['infoInscrito'] = allInscrito.rows;
      return res.json(datos);

    } catch (error) {
      msg(error ," verificar");
      return console.log(error);
    }
  };
 

  module.exports = {
    inscripcion,
    GetInscrito
  };