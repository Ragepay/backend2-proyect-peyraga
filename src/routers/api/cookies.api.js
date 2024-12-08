import CustomRouter from "../../utils/CustomRouter.util.js";

class CookieApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }
    init = () => { // Endpoints de cookies
        // GET Leer todas las cookies mediantes req.cookies.
        this.read("/get", ["ADMIN"], getCookies);
        // GET Leer una cookie en especifico por params del endpoint mediante el req.cookies.
        this.read("/get/:clave", ["ADMIN"], getOneCookie);
        // POST Creacion/Actualizacion de una cookie, se sobre-escribe cuando se modifica, con el mismo metodo de creacion.
        this.create("/set", ["ADMIN"], setCookie);
        // DELETE Eliminar una cookie en especifico.
        this.destroy("/delete/:clave", ["ADMIN"], deleteCookie);
        // POST Crear una cookie con informacion firmada por seguridad.
        this.create("/setSigned", ["ADMIN"], setCookieSigned);
        // GET Leer una signed cookie.
        this.read("/getSigned", ["ADMIN"], getCookiesSigned);
    }
}

// Funcion leer y responder todas las cookies normales y firmadas.
function getCookies(req, res) {
    const message = "TODAS LAS COOKIES LEIDAS";
    const cookies = req.cookies;
    return res.status(200).json({ message, cookies, signedCookie: req.signedCookies });
}
// Funcion obtener una cookie por su clave, devolviendo el valor.
function getOneCookie(req, res) {
    const message = "COOKIE LEIDA";
    const { clave } = req.params;
    const valor = req.cookies[clave];
    if (!valor) {
        const message = "COOKIE NOT FOUND.";
        return res.json400(message);
    }
    return res.json200(valor, message);
}
// Funcion para crear o setear una cookie ya creada. (crea y actualiza)
function setCookie(req, res) {
    // para setear/crear una cooki necesito enviar el par clave/valor de la cookie en el objeto de respuesta con el metodo cookie.
    const message = "COOKIE CREADA/SETEADA";
    const { clave, valor } = req.body;
    const cookie = { clave, valor };
    return res.cookie(clave, valor).json201(cookie, message);
    // Primero el estado(codigo), despues la cookie, y despues el json.
    //return res.status(201).cookie(clave, valor).json({ message, cookie });
}

// Funcion que elimina una cookie ingresando la clave en params.
function deleteCookie(req, res) {
    // asi como la creacion de una cookie se hace en el objeto de respuesta a enviar al cliente la eliminacion de una cookie se hace desde el objeto de respuesta.
    const { clave } = req.params;
    const message = "COOKIE: " + clave + " ELIMINADA";
    res.clearCookie(clave).json200(null, message);
    //return res.status(200).clearCookie(clave).json({ message });
}
// Funcion para crear o setear una cookie ya creada. (crea y actualiza). Pero Firmada
function setCookieSigned(req, res) {
    const message = "COOKIE FIRMADA CREADA";
    const { clave, valor } = req.body;
    const cookie = { clave, valor };
    res.cookie(clave, valor, { signed: true }).json200(cookie, message);
    //return res.status(201).cookie(clave, valor, { signed: true }).json({ message, cookie });
}
// Funcion que lee todas las cookies firmadas.
function getCookiesSigned(req, res) {
    const message = "COOKIE SIGNED LEIDA"
    const cookies = req.cookies;
    const signedCookies = req.signedCookies;
    res.json200({ cookies, signedCookies }, message);
    //return res.status(200).json({ cookies, signedCookies });
}

let cookieApiRouter = new CookieApiRouter();
export default cookieApiRouter.getRouter();

/*
Antes de Custom Router
import { Router } from "express";
const cookieApiRouter = Router();
// GET Leer todas las cookies mediantes req.cookies.
cookieApiRouter.get("/get", (req, res, next) => {
    try {
        const message = "TODAS LAS COOKIES LEIDAS"
        const cookies = req.cookies;
        return res.status(200).json({ message, cookies, signedCookie: req.signedCookies });
    } catch (error) {
        return next(error);
    };
});

// GET Leer una cookie en especifico por params del endpoint mediante el req.cookies.
cookieApiRouter.get("/get/:clave", (req, res, next) => {
    try {
        const message = "COOKIE LEIDA"
        const { clave } = req.params
        const valor = req.cookies[clave];
        return res.status(200).json({ message, valor });
    } catch (error) {
        return next(error);
    };
});

// POST Creacion/Actualizacion de una cookie, se sobre-escribe cuando se modifica, con el mismo metodo de creacion.
cookieApiRouter.post("/set", (req, res, next) => {
    try {
        // para setear/crear una cooki necesito enviar el par clave/valor de la cookie en el objeto de respuesta con el metodo cookie.
        const message = "COOKIE CREADA/SETEADA";
        const { clave, valor } = req.body;
        const cookie = { clave, valor };
        return res
            // Primero el estado(codigo), despues la cookie, y despues el json.
            .status(201)
            .cookie(clave, valor)
            .json({ message, cookie });

    } catch (error) {
        return next(error);
    };
});

// DELETE Eliminar una cookie en especifico.
cookieApiRouter.delete("/delete/:clave", (req, res, next) => {
    try {
        // asi como la creacion de una cookie se hace en el objeto de respuesta a enviar al cliente la eliminacion de una cookie se hace desde el objeto de respuesta.
        const { clave } = req.params;
        const message = "COOKIE: " + clave + " ELIMINADA";
        return res.
            status(200)
            .clearCookie(clave)
            .json({ message });
    } catch (error) {
        return next(error);
    };
});

// POST Crear una cookie con informacion firmada por seguridad.
cookieApiRouter.post("/setSigned", (req, res, next) => {
    try {
        const message = "COOKIE FIRMADA CREADA";
        const { clave, valor } = req.body;
        const cookie = { clave, valor };
        return res.
            status(201)
            .cookie(clave, valor, { signed: true })
            .json({ message, cookie });
    } catch (error) {
        return next(error);
    };
});

// GET Leer una signed cookie.
cookieApiRouter.get("/getSigned", (req, res, next) => {
    try {
        const cookies = req.cookies;
        const signedCookies = req.signedCookies;
        return res.
            status(200).json({ cookies, signedCookies });
    } catch (error) {
        return next(error);
    };
});
*/