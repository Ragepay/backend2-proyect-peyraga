import {
    verify
} from "../services/sessions.service.js";

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

async function verifyUser(req, res, next) {
    // Extraccion de code y email de query params.
    const { email, code } = req.query;
    // Verificacion del codigo.
    const response = await verify(email, code);
    // Verificacion exitosa o no.
    if (response) {
        const message = "User verified."
        res.json200("OK", message);
    } else {
        res.json401();
    };

    /*
    const { code } = req.params;
    const response = { online: true };
    const message = req.user.email.toUpperCase() + " IS ONLINE.";
    res.json200(response, message);
    */
}

export { online, register, login, google, signout, verifyUser };