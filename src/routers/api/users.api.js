import CustomRouter from "../../utils/CustomRouter.util.js";
import { read, update, destroy, readById } from "../../data/mongo/managers/users.manager.js";
import { createHashUtil } from "../../utils/hash.util.js";
import passportCB from "../../middlewares/passportCB.mid.js";

class UsersApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        // ENDPOINTS -----------------------------------------------------------
        // GET | Get all users. Private.
        this.read("/", passportCB("admin"), getUsers);
        // GET | Get one user. Private.
        this.read("/:id", getOneUser);
        // POST | Create user. Private.              UTILIZAR EL REGISTER DE SESSION
        this.create("/", passportCB("register"), createUser);
        // PUT | Update user. Private.
        this.update("/:id", passportCB("admin"), updateUser);
        // DELETE | Delete user. Private.
        this.destroy("/:id", passportCB("admin"), deleteUser);
    }
}

// FUNCIONES -----------------------------------------------------------
// Function getUsers.
async function getUsers(req, res, next) {
    const message = "USERS FOUND.";
    const users = await read();
    return res.status(200).json({ message, users });
};

// Function getOneUser.
async function getOneUser(req, res, next) {
    const { id } = req.params;
    const message = "USER FOUND.";
    const user = await readById(id);
    return res.status(200).json({ message, user });
};

// Function createUser.
async function createUser(req, res, next) {
    return res.status(201).json({ message: "USER CREATED.", user: req.user });
};

// Function updateUser.
async function updateUser(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
        data.password = createHashUtil(data.password);
    }
    const message = "USERS UPDATED.";
    const user = await update(id, data);
    return res.status(200).json({ message, user });
};

// Function deleteUser.
async function deleteUser(req, res, next) {
    const { id } = req.params;
    const message = "USERS DELETED.";
    const user = await destroy(id);
    return res.status(200).json({ message, user });
};

let usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();

/*
Antes de Custom Router
//import { Router } from "express";
//const usersApiRouter = Router();

// ENDPOINTS -----------------------------------------------------------
// GET | Get all users. Private.
usersApiRouter.get("/", passportCB("admin"), getUsers);

// GET | Get one user. Private.
usersApiRouter.get("/:id", getOneUser);

// POST | Create user. Private.              UTILIZAR EL REGISTER DE SESSION
usersApiRouter.post("/", passportCB("register"), createUser);

// PUT | Update user. Private.
usersApiRouter.put("/:id", passportCB("admin"), updateUser);

// DELETE | Delete user. Private.
usersApiRouter.delete("/:id", passportCB("admin"), deleteUser);
*/