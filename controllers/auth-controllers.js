import { User } from "../models/Users.js";
import { generateToken } from "../utilities/generateToken.js";

export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new User({email, password});
        await user.save();

        // JWT TOKEN PROXIMO PASO
        return res.json({25: true})
    } catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000){
            return res.status(400).json({error: "Ya existe ese usuario"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }
   
};

export const login =  async (req, res) => {
    try {
        const {email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) 
        return res.status(403).json({error: "No existe este usuario"});

        const respuestaPassword = await user.comparePassword(password)
        if (!respuestaPassword)
           return res.status(403).json({error: "Contraseña incorrecta"});
        
        // Generar JSON Web Token
        const {token, expiresIn} = generateToken(user.id)

        return res.json({token, expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error de servidor"});
    }
};

export const infoUser = async (req,res) => {
    try {
        const user = await User.findById(req.uid).lean()
         return res.json({ email: user.email, uid: user.uid });
    } catch (error) {
        return res.status(500).json({error: "Error de servidor"});
    }
   
};