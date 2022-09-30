import  { Router}  from "express";
import { login, logout, registro, renderIndex, renderLogin, renderRegistro } from "../controllers/auth-controllers.js";
import { userAuthenticated } from "../utilities/validateSession.js";

const router = Router()

router.get('/', userAuthenticated ,renderIndex )

router.get('/registro', renderRegistro)
router.get('/login', renderLogin )
router.get("/logout", logout)

router.post("/registro", registro);
router.post("/login",  login);

export default router