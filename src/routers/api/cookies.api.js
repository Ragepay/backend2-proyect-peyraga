import { signedCookie } from "cookie-parser";
import { Router } from "express";

const cookieRouter = Router();

// GET Leer todas las cookies mediantes req.cookies.
cookieRouter.get("/get", (req, res, next) => {
    try {
        const message = "TODAS LAS COOKIES LEIDAS"
        const cookies = req.cookies;
        return res.status(200).json({ message, cookies, signedCookie: req.signedCookies });
    } catch (error) {
        return next(error);
    };
});

// GET Leer una cookie en especifico por params del endpoint mediante el req.cookies.
cookieRouter.get("/get/:clave", (req, res, next) => {
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
cookieRouter.post("/set", (req, res, next) => {
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
cookieRouter.delete("/delete/:cookie", (req, res, next) => {
    try {
        // asi como la creacion de una cookie se hace en el objeto de respuesta a enviar al cliente la eliminacion de una cookie se hace desde el objeto de respuesta.
        const { cookie } = req.params;
        const message = "COOKIE: " + cookie + " ELIMINADA";
        return res.
            status(200)
            .clearCookie(cookie)
            .json({ message });
    } catch (error) {
        return next(error);
    };
});

// POST Crear una cookie con informacion firmada por seguridad.
cookieRouter.post("/setSigned", (req, res, next) => {
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
cookieRouter.get("/getSigned", (req, res, next) => {
    try {
        const cookies = req.cookies;
        const signedCookies = req.signedCookies;
        return res.
            status(200).json({ cookies, signedCookies });
    } catch (error) {
        return next(error);
    };
});

export default cookieRouter;