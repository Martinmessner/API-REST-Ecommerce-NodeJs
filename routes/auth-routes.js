import  express  from "express";
import { login, register } from "../controllers/auth-controllers.js";
import {body} from "express-validator";
import { validationResultExpress } from "../middleware/autentificacion-express-validator.js";

const router = express.Router()

router.post("/users",[
    body("email", "Formato de Email Incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail()]
    
    ,validationResultExpress,login
    );

router.post("/register",[
    body("email", "Formato de Email Incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "La contraseña requiere minimo 5 caracteres.").trim() .isLength({min: 5}),
body("password", "Formato de contraseña incorrecto").custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error("No coinciden las contraseñas")
        }
        return value;
    }),
], 
validationResultExpress,
register
);

export default router