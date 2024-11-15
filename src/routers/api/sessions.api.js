import { Router } from "express";
import { create } from "../../data/mongo/managers/users.manager.js";
import isVerifyPassword from "../../middlewares/isVerifyPassword.mid.js";

const sessionApiRouter = Router();

// Registrar un usuario.
sessionApiRouter.post("/register", async (req, res, next) => {
    try {
        // middleware para validar campos obligatorios !
        // middleware de usuario existente
        const message = "USER REGISTERED";
        const data = req.body;
        const response = await create(data);
        return res.status(201).json({ message, response });
    } catch (error) {
        return next(error);
    };
});

// Login de usuario.
sessionApiRouter.post("/login", isVerifyPassword, async (req, res, next) => {
    try {
        req.session.online = true;
        req.session.email = req.body.email;
        const message = "USER LOGGED IN"
        return res.status(200).json({ message })
    } catch (error) {
        return next(error);
    };
});

// Signout de usuario.
sessionApiRouter.post("/signout", async (req, res, next) => {
    try {
        const session = req.session;
        req.session.destroy();
        const message = "USER SIGNED OUT";
        return res.status(200).json({ message, session });
    } catch (error) {
        return next(error);
    };
});

// Online usuario.
sessionApiRouter.post("/online", (req, res, next) => {
    try {
        const session = req.session;
        if (session.online) {
            const message = "USER ONLINE";
            return res.status(200).json({ message, session });
        }
        const message = "INVALID CREDENCIALS";
        return res.status(401).json({ message });
    } catch (error) {
        return next(error);
    };
});

export default sessionApiRouter;