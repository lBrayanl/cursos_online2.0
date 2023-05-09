const { Router } = require("express");
const {nuevo_Usuario, getUsuario, obtenerCurso, cursosUser, _login, inscripcionContoler, datosCursos, informacionCurso, obtenerVideo }= require("../Controller/User")



const router = Router();

router.post("/nuevoUsuario",nuevo_Usuario)
router.get("/getUsuario",getUsuario)
router.post("/login",_login)
router.get("/obtenerCursos",obtenerCurso)
router.get("/cursoUser/:usuario",cursosUser)
router.post("/inscripcion",inscripcionContoler)

router.get("/dataCurso/:curso",datosCursos)
router.get("/infoCurso/:curso",informacionCurso)

router.get("/cargaVideo", obtenerVideo)
//router.get("/inscripcion",GetInscrito)

module.exports = router;