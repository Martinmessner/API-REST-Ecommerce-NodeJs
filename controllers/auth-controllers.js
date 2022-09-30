import { User } from "../models/Users.js";
import passport from "passport"

export const renderIndex = (req,res) => {
    res.render("index")
};
        // Login del Metodo GET
export const renderLogin = (req,res) => {
    res.render("login")
};

     // El Login pero del METODO POST
export const login = passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/ñ",
    failureFlash: false,
    
  });

      // Registro del Metodo GET
export const renderRegistro = (req,res) => {
    res.render("registro")
};


       // El registro pero del METODO POST
export const registro = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new User({email, password});
        await user.save();

        return res.render("login")
    } catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000){
            return res.status(400).json({error: "Ya existe ese usuario"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }
   
};
// Cerrar Sesion
export const logout = async (req,res) => {
    res.send("logout")
}