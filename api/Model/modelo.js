const conexion = require('../conexion');
module.exports = {
   
    async obtener(){
        sql = 'SELECT * FROM usuarios;';
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async login(correo,password){
        // Se busca coincidencias con las credenciales
        sql = "SELECT (CASE WHEN email != '' AND password != '' THEN 1 ELSE 0 END) FROM login WHERE email = '"+correo+"' AND password = '"+password+"'";
        const result = await pool.query(sql);

        // Si el usuario no existe
        if (!resultados.rows[0]) {
            return resultados;
        }

        // Si el usuario existe, verifica la contraseña cifrada.
        const usuario = result.rows[0];
        const match = await bcrypt.compare(password, usuario.password);

        // Si la contraseña no coincide, devuelve un mensaje de error.
        if (!match) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        // Se envia que el ingreso fue exitoso
        return resultados.rows;
    },
    async octenerCursos(){
        sql = "SELECT * FROM cursos";
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async cursosRelacionados(user){
        sql = "SELECT CU.*, ins.avance, ins.horasvistas AS horas_vistas, ins.nivel_aprendizaje,ins.nota,ins.sw_estado FROM inscritos AS ins INNER JOIN cursos AS CU ON CU.cursos_id = ins.cursos_id_cursos WHERE usuarios_user_id = "+user+";";
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async inscripcion (req, res, next){
        const inscritos = await pool.query(
        `INSERT INTO inscritos (usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado) VALUES ($1, $2,$3, $4,$5,$6,$7)`,
        [usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado]);

        console.log(inscritos);
        res.json(inscritos.rows[0])
    },
    async GetInscrito (req, res, msg){
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
    }
}