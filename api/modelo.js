const conexion = require('../api/conexion');
module.exports = {
   
    async obtener(){
        sql = 'SELECT * FROM usuarios;';
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async login(correo,password){
        sql = "SELECT nombre_1 FROM usuarios WHERE email = '"+correo+"' AND password = '"+password+"'";
        const resultados = await conexion.query(sql);
        return (!resultados.rows[0])?resultados:resultados.rows;
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
    }
}