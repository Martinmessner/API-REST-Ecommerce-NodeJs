import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Conectada Exitosamente a la BBDD")
} catch (error) {
    console.log("Error en la conexion a la base de datos" + error)
}

