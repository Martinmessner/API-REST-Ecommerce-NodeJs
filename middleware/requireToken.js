import jwt  from "jsonwebtoken";

export const requireToken = (req,res,next) => {
    try {
        let token = req.headers?.authorization;
        console.log(token)
        if (!token)
        throw new Error("No existe el Token en el header, usa Beared")

        token = token.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = uid;

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message});
    }
};