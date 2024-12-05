import { Router } from "express";
import { read, update, destroy, readById } from "../../data/mongo/managers/users.manager.js";
import passport from "../../middlewares/passport.mid.js";
import { createHashUtil } from "../../utils/hash.util.js";

const usersApiRouter = Router();

// ENDPOINTS -----------------------------------------------------------
// GET | Get all users. Private.
usersApiRouter.get("/", getUsers);

// GET | Get one user. Private.
usersApiRouter.get("/:id", getOneUser);

// POST | Create user. Private.              UTILIZAR EL REGISTER DE SESSION
usersApiRouter.post("/", passport.authenticate("register", { session: false }), createUser);

// PUT | Update user. Private.
usersApiRouter.put("/:id", updateUser);

// DELETE | Delete user. Private.
usersApiRouter.delete("/:id", deleteUser);

// FUNCIONES -----------------------------------------------------------
// Function getUsers.
async function getUsers(req, res, next) {
    try {
        const message = "USERS FOUND.";
        const users = await read();
        return res.status(200).json({ message, users });
    } catch (error) {
        return next(error);
    };
};

// Function getOneUser.
async function getOneUser(req, res, next) {
    try {
        const { id } = req.params;
        const message = "USER FOUND.";
        const user = await readById(id);
        return res.status(200).json({ message, user });
    } catch (error) {
        return next(error);
    };
};

// Function createUser.
async function createUser(req, res, next) {
    try {
        return res.status(201).json({ message: "USER CREATED.", user: req.user });
    } catch (error) {
        return next(error);
    };
};

// Function updateUser.
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.password) {
            data.password = createHashUtil(data.password);
        }
        const message = "USERS UPDATED.";
        const user = await update(id, data);
        return res.status(200).json({ message, user });
    } catch (error) {
        return next(error);
    };
};

// Function deleteUser.
async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const message = "USERS DELETED.";
        const user = await destroy(id);
        return res.status(200).json({ message, user });
    } catch (error) {
        return next(error);
    };
};




export default usersApiRouter;
