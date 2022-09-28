import "dotenv/config";
import "./database/connectdb.js"
import  express  from "express";
import router from "./routes/auth-routes.js";
import path from 'path';
const __dirname = path.resolve();

// MIDDLEWARE
const app = express()
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pepino', (req,res) => {
    res.render("index")
})
app.get('/login', (req,res) => {
    res.render("login")
})
app.use((req,res,next) => {
    res.status(404).render("404")
})

app.use("/api", router)



const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Activo🎶🎶😉😉🎉http://localhost:${PORT}`) )