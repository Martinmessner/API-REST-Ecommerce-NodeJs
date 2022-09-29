import "dotenv/config";
import "./database/connectdb.js"
import  express  from "express";
import router from "./routes/auth-routes.js";
import path from 'path';
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
const __dirname = path.resolve();
import "./utilities/passport.js"
// MIDDLEWARE
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,'/views'));
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", router)

app.use((req,res,next) => {
    res.status(404).render("404")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Activo🎶🎶😉😉🎉http://localhost:${PORT}`) )