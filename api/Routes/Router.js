const { Router } = require("express");
const {usuario, getUsuario, obtenerCurso, cursosUser, login, inscripcionContoler }= require("../Controller/User")



const router = Router();

router.post("/usuario",usuario)

router.get("/getUsuario",getUsuario)

router.post("/login",login)

router.get("/obtenerCursos",obtenerCurso)
router.get("/cursoUser/:usuario",cursosUser)

router.post("/inscripcion",inscripcionContoler)
router.get("/inscripcion",GetInscrito)

module.exports = router;