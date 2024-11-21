import { Router } from "express";
import { create, readByEmail, readById } from "../../data/mongo/managers/users.manager.js";
import isVerifyPassword from "../../middlewares/isVerifyPassword.mid.js";
import isUser from "../../middlewares/isUser.mid.js";
import isValidUserData from "../../middlewares/isValidUserData.mid.js";

const sessionApiRouter = Router();


// Registrar un usuario.
sessionApiRouter.post("/register", isValidUserData, isUser, register);

// Login de usuario.
sessionApiRouter.post("/login", isVerifyPassword, login);

// Signout de usuario.
sessionApiRouter.post("/signout", signout);

// Online usuario.
sessionApiRouter.post("/online", online);

export default sessionApiRouter;


// Funciones Callbacks final de los endpoints de sessions.
async function register(req, res, next) {
    try {
        const message = "USER REGISTERED";
        const data = req.body;
        const one = await create(data);
        return res.status(201).json({ message, one: one._id });
    } catch (error) {
        return next(error);
    };
}

async function login(req, res, next) {
    try {
        const { email } = req.body;
        const user = await readByEmail(email);
        req.session.online = true;
        req.session.email = req.body.email;
        req.session.role = user.role;
        req.session.user_id = user._id;
        const message = "USER LOGGED IN";
        return res.status(200).json({ message, user });
    } catch (error) {
        return next(error);
    };
}

async function signout(req, res, next) {
    try {
        const session = req.session;
        req.session.destroy();
        const message = "USER SIGNED OUT";
        return res.status(200).json({ message, session });
    } catch (error) {
        return next(error);
    };
}

async function online(req, res, next) {
    try {
        const { user_id } = req.session;
        const user = await readById(user_id);
        console.log(user);
        if (user_id) {
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
