import { Router } from "express";
import { create, readByEmail, readById } from "../../data/mongo/managers/users.manager.js";
//import isValidUser from "../../middlewares/isValidUser.mid.js";
//import isUser from "../../middlewares/isUser.mid.js";
//import isValidUserData from "../../middlewares/isValidUserData.mid.js";
//import createHash from "../../middlewares/createHash.mid.js";
//import verifyHash from "../../middlewares/verifyHash.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionApiRouter = Router();


// Registrar un usuario.
sessionApiRouter.post("/register", passport.authenticate("register", { session: false }), register);

// Login de usuario.
sessionApiRouter.post("/login", passport.authenticate("login", { session: false }), login);

// Signout de usuario.
sessionApiRouter.post("/signout", signout);

// Online usuario.
sessionApiRouter.post("/online", online);

// Google oauth2.
sessionApiRouter.post("/auth/google", (req, res, next) => {
    res.send("Google oauth2")
});

// Google CallBack.
sessionApiRouter.post("/auth/google/cb", (req, res, next) => {
    res.send("Google oauth2 CALLBAKC")
});

export default sessionApiRouter;


// Funciones Callbacks final de los endpoints de sessions.
async function register(req, res, next) {
    try {
        const user = req.user;
        return res.status(201).json({ message: "USER CREATED.", user_id: user._id });
    } catch (error) {
        return next(error);
    };
}

async function login(req, res, next) {
    try {
        const user = req.user;
        const message = "USER LOGGED IN";
        return res.status(200).json({ message, user_id: user._id });
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
