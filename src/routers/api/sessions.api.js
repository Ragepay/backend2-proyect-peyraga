import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCB from "../../middlewares/passportCB.mid.js";

class SessionApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        // Endpóints de Sessions.-------------------------------------------------------------------------------------------
        // Registrar un usuario.
        this.create("/register", ["PUBLIC"], passportCB("register"), register);

        // Login de usuario.
        this.create("/login", ["PUBLIC"], passportCB("login"), login);

        // Signout de usuario.
        this.create("/signout", ["USER", "ADMIN"], passportCB("signout"), signout);

        // Online usuario.
        this.create("/online", ["USER", "ADMIN"], passportCB("online"), online);

        // Google oauth2. Encargada de Autenticar
        this.read("/auth/google", ["PUBLIC"], passportCB("google"));

        // Google CallBack. Encargada de register/login con google.
        this.read("/auth/google/cb", ["PUBLIC"], passportCB("google"), google);
    }
}

// Funciones Callbacks final de los endpoints de sessions.----------------------------------------------------------
// Funcion devuelve usuario creado.
function register(req, res, next) {
    const user = req.user;
    const message = `USER ${user.email} CREATED.`;
    res.json201(user, message);
}

// Funcion crea cookie con token de session. Devuelve status true si es exitosa.
function login(req, res, next) {
    // Extraemos el token del objt req.token.
    const token = req.token;
    // Opciones para la cookie que almacenara el token. Duracion 7 dias y con seguridad httpOnly.
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
    const message = "USER LOGGED IN.";
    const response = null;
    // Creamos la cookie. Y respondemos.
    //return res.status(200).cookie("token", token, opts).json({ message });
    res.cookie("token", token, opts).json200(response, message);
}

// Funcion crea cookie con token de session. Y redirecciona.
function google(req, res, next) {
    // Extraemos el token del objt req.token.
    const token = req.token;
    // Opciones para la cookie que almacenara el token. Duracion 7 dias y con seguridad httpOnly.
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
    // Creamos la cookie. Y respondemos.
    return res.status(200).cookie("token", token, opts).redirect("/");
}

// Funcion que destruye la cookie. Dejando si session al cliente.
function signout(req, res, next) {
    /*
         // Extraemos el token del objt req.token.
        req.token = finishTokenUtil({
            user: req.user
        })
        const token = req.token;
        // Opciones para la cookie que almacenara el token. Duracion 7 dias y con seguridad httpOnly.
        const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
        // Creamos la cookie. Y respondemos.
        return res.status(200).Cookie("token", token, opts).redirect("/index.html");
    */
    //return res.status(200).clearCookie("token").json({ message: "USER SIGN OUT." });
    const response = null;
    const message = "USER SIGN OUT.";
    res.clearCookie("token").json200(response, message);
}

// Funcion contesta que esta online.
function online(req, res, next) {
    //res.status(200).json({message: req.user.email.toUpperCase() + " IS ONLINE.", online: true});
    const response = { online: true };
    const message = req.user.email.toUpperCase() + " IS ONLINE.";
    res.json200(response, message);
}

let sessionApiRouter = new SessionApiRouter;
export default sessionApiRouter.getRouter();


/*
Antes de Custom Router
import { Router } from "express";
const sessionApiRouter = Router();
// Endpóints de Sessions.-------------------------------------------------------------------------------------------
// Registrar un usuario.
sessionApiRouter.post("/register", passportCB("register"), register);

// Login de usuario.
sessionApiRouter.post("/login", passportCB("login"), login);

// Signout de usuario.
sessionApiRouter.post("/signout", passportCB("signout"), signout);

// Online usuario.
sessionApiRouter.post("/online", passportCB("online"), online);

// Google oauth2. Encargada de Autenticar
sessionApiRouter.get("/auth/google", passportCB("google"));

// Google CallBack. Encargada de register/login con google.
sessionApiRouter.get("/auth/google/cb", passportCB("google"), google);
*/

/*
// Google oauth sin passport.
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isUser from "../../middlewares/isUser.mid.js";
import isValidUserData from "../../middlewares/isValidUserData.mid.js";
import createHash from "../../middlewares/createHash.mid.js";
import verifyHash from "../../middlewares/verifyHash.mid.js";
import axios from "axios";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const TOKEN_URL = process.env.TOKEN_URL;

const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

// Google oauth2.
sessionApiRouter.get("/auth/google", (req, res, next) => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;
    res.redirect(authUrl);
    //res.send("Google oauth2")
});

// Google CallBack.
sessionApiRouter.get("/auth/google/cb", async (req, res, next) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("No se recibió un código de autenticación.");
    };

    try {
        // Intercambiar el código por un token de acceso
        const response = await axios.post(
            TOKEN_URL,
            {
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code",
            },
            { headers: { "Content-Type": "application/json" } }
        );

        // Destructurar el token de acceso.
        const { access_token } = response.data;

        // Obtener datos del usuario con el token de acceso
        const userInfoResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            { headers: { Authorization: `Bearer ${access_token}` } }
        );
        // Informacion del usuario de google
        const userInfo = userInfoResponse.data;
        // Traer el usuario de la BBDD.
        const user = await readByEmail(userInfo.email);

        if (!user) {
            // Usuario no existe, registrar uno nuevo
            const newUser = await create({
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.id,
                picture: userInfo.picture,
                // Otros datos que necesites
            });
            req.session.user = newUser;
        } else {
            req.session.user = user;
        }

        //req.session.user = newUser || user;
        // Guardar la información del usuario en una cookie o base de datos
        res
            .status(200)
            .cookie("user", JSON.stringify(userInfo), { httpOnly: true })
            .redirect("/index.html")

    } catch (error) {
        console.error("Error durante la autenticación:", error);
        res.status(500).send("Error en el inicio de sesión.");
    }
});
*/