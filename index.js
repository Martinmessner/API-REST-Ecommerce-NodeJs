import "dotenv/config";
import "./database/connectdb.js"
import  express  from "express";
import router from "./routes/auth-routes.js";
import path from 'path';
const __dirname = path.resolve();

// MIDDLEWARE
const app = express()
app.use(express.json())
app.use("/api", router)



app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Activo🎶🎶😉😉🎉http://localhost:${PORT}`) )