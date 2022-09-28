import  { Router}  from "express";
import { infoUser, login, register } from "../controllers/auth-controllers.js";
import {body} from "express-validator";
import { validationResultExpress } from "../middleware/autentificacion-express-validator.js";
import { requireToken } from "../middleware/requireToken.js";
import path from 'path';
const __dirname = path.resolve();

const router = Router()

router.post("/login",[
    body("email", "Formato de Email Incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail()]
    
    ,validationResultExpress,login
    );

router.post("/register",
[
    body("email", "Formato de Email Incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password", "La contraseña requiere minimo 5 caracteres.").trim() .isLength({min: 5}),
body("password", "Formato de contraseña incorrecto").custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error("No coinciden las contraseñas")
        }
        return value;
     }
    ),
], 
validationResultExpress,
register
);

router.get("/protected",requireToken, infoUser)




export default router