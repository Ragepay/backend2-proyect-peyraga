import CustomRouter from "../../utils/CustomRouter.util.js";
import { getUsers, getOneUser, createUser, updateUser, deleteUser } from "../../controllers/users.controller.js";
import passportCB from "../../middlewares/passportCB.mid.js";

class UsersApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        // ENDPOINTS -----------------------------------------------------------
        // GET | Get all users. Private.
        this.read("/", ["ADMIN"], passportCB("admin"), getUsers);
        // GET | Get one user. Private.
        this.read("/:id", ["ADMIN"], getOneUser);
        // POST | Create user. Private.              UTILIZAR EL REGISTER DE SESSION
        this.create("/", ["ADMIN"], passportCB("register"), createUser);
        // PUT | Update user. Private.
        this.update("/:id", ["USER", "ADMIN"], updateUser);
        // DELETE | Delete user. Private.
        this.destroy("/:id", ["USER", "ADMIN"], passportCB("admin"), deleteUser);
    }
}

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