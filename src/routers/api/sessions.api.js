import { Router } from "express";
import { create, readByEmail, readById } from "../../data/mongo/managers/users.manager.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyTokenUtil } from "../../utils/token.util.js";

//import isValidUser from "../../middlewares/isValidUser.mid.js";
//import isUser from "../../middlewares/isUser.mid.js";
//import isValidUserData from "../../middlewares/isValidUserData.mid.js";
//import createHash from "../../middlewares/createHash.mid.js";
//import verifyHash from "../../middlewares/verifyHash.mid.js";

const sessionApiRouter = Router();

/*
// Google oauth sin passport.
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

// Registrar un usuario.
sessionApiRouter.post("/register", passport.authenticate("register", { session: false }), register);

// Login de usuario.
sessionApiRouter.post("/login", passport.authenticate("login", { session: false }), login);

// Signout de usuario.
sessionApiRouter.post("/signout", passport.authenticate("signout", { session: false }), signout);

// Online usuario.
sessionApiRouter.post("/online", passport.authenticate("online", { session: false }), online);

// Google oauth2. Encargada de Autenticar
sessionApiRouter.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// Google CallBack. Encargada de register/login con google.
sessionApiRouter.get("/auth/google/cb", passport.authenticate("google", { session: false }), google);


export default sessionApiRouter;


// Funciones Callbacks final de los endpoints de sessions.
async function register(req, res, next) {
    try {
        return res.status(201).json({ message: "USER CREATED." });
    } catch (error) {
        return next(error);
    };
}

async function login(req, res, next) {
    try {
        const user = req.user;
        const token = req.token;
        return res.status(200).json({ message: "USER LOGGED IN", token, isOnline: user.isOnline });
    } catch (error) {
        return next(error);
    };
}

async function signout(req, res, next) {
    try {
        const session = req.session;
        req.session.destroy();
        return res.status(200).json({ message: "USER SIGNED OUT", session });
    } catch (error) {
        return next(error);
    };
}

async function online(req, res, next) {
    try {
        const { token } = req.headers;
        const data = verifyTokenUtil(token);
        const user = await readById(data.user_id);
        if (user) {
            const message = user.email.toUpperCase() + " IS ONLINE";
            return res.status(200).json({ message, online: true });
        } else {
            const message = "USER IS NOT ONLINE";
            return res.status(400).json({ message, online: false });
        }
    } catch (error) {
        return next(error);
    };
}

function google(req, res, next) {
    try {
        //const user = req.user;
        //return res.redirect("/index.html")
        return res.status(200).json({ message: "Logged in with Google", token: req.token });
    } catch (error) {
        return next(error);
    };
}

