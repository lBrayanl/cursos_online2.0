const { Router } = require("express");
const app = require("express")
const {usuario, getUsuario, obtenerCurso, cursosUser }= require("../Controller/User")
const{ login } = require("../Model/Login");
const { inscripcion,GetInscrito } = require("../Model/Incrito");



const router = Router();

router.post("/usuario",usuario)

router.get("/getUsuario",getUsuario)

router.get("/")

router.post("/login",login)

router.get("/obtenerCursos",obtenerCurso)
router.get("/cursoUser/:usuario",cursosUser)

router.post("/inscripcion",inscripcion)
router.get("/inscripcion",GetInscrito)

module.exports = router;