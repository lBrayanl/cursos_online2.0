const conexion = require('../conexion');
const bcrypt = require('bcrypt');
module.exports = {
   
    async obtener(){
        sql = 'SELECT * FROM usuarios;';
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async login(correo,password){
        // Se busca coincidencias con las credenciales
        sql = "SELECT * FROM login WHERE email = '"+correo+"'";
        const resultados = await conexion.query(sql);
        // Si el usuario no existe
        if (!resultados.rows[0]) {
            return resultados;
        }
        // Si el usuario existe, verifica la contraseña cifrada.
        const usuario = resultados.rows[0];
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
        const inscritos = await conexion.query(
        `INSERT INTO inscritos (usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado) VALUES ($1, $2,$3, $4,$5,$6,$7)`,
        [usuarios_user_id,cursos_id_cursos,avance,horasvistas,nivel_aprendizaje,nota,sw_estado]);

        console.log(inscritos);
        res.json(inscritos.rows[0])
    },
    async GetInscrito (req, res, msg){
        try {
          // Se obtiene el usuario a consultar
          const incrito = req.params.usuario;
          const allInscrito = await conexion.query("SELECT * FROM inscritos");
    
          var datos = {};
          datos['infoInscrito'] = allInscrito.rows;
          return res.json(datos);
    
        } catch (error) {
          msg(error ," verificar");
          return console.log(error);
        }
    },
    async nuevoUsuario(nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero,correo,hashedPassword){
        // Se validan los datos del segundo nombre y segundo apellido
        columna1 = (nombre_2)?',nombre_2':' ';
        columna2 = (apellido_2)?', apellido_2':' ';
        valor1 = (nombre_2)?", '"+nombre_2+"'":" " ;
        valor2 = (apellido_2)?", '"+apellido_2+"'":" ";
        // Se inserta en la tabla usuarios.
        sql = `INSERT INTO usuarios 
                (nombre_1`+columna1+`,apellido_1`+columna2+`, sw_estado,edad,genero) 
                VALUES 
                ('`+nombre_1+`'`+valor1+`,'`+apellido_1+`'`+valor2+`, '`+sw_estado+`','`+edad+`','`+genero+`')`;
        const newUsuario = await conexion.query(sql);
        if(!newUsuario.rowCount){
            return false
        }
        // Se obtiene el id insertado
        sql = "SELECT user_id FROM usuarios WHERE nombre_1 = '"+nombre_1+"' AND apellido_1 = '"+apellido_1+"' AND genero = '"+genero+"';";
        const id_user = await conexion.query(sql);
        // Se inserta en la tabla login 
        sql = "INSERT INTO login (usuarios_user_id,password,email,created_on,last_login) VALUES ("+id_user.rows[0].user_id+",'"+hashedPassword+"','"+correo+"',NOW(),NOW())";
        const resultado = await conexion.query(sql);
        return resultado.rowCount;
    },
}