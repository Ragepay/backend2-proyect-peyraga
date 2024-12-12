import { createHashUtil } from "../utils/hash.util.js";
import {
    readUsersService,
    readOneUsersService,
    updateUsersService,
    deleteUsersService
} from "../services/users.service.js";

// FUNCIONES -----------------------------------------------------------
// Function getUsers.
async function getUsers(req, res, next) {
    const message = "USERS FOUND.";
    const user = await readUsersService();
    res.json200(user, message);
    //return res.status(200).json({ message, users });
};

// Function getOneUser.
async function getOneUser(req, res, next) {
    const { id } = req.params;
    const message = "USER FOUND.";
    const user = await readOneUsersService(id);
    res.json200(user, message);
    //return res.status(200).json({ message, user });
};

// Function createUser.
async function createUser(req, res, next) {
    const message = "USER CREATED.";
    const user = req.user;
    res.json201(user, message);
    //return res.status(201).json({ message: "USER CREATED.", user: req.user });
};

// Function updateUser.
async function updateUser(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
        data.password = createHashUtil(data.password);
    }
    const message = "USERS UPDATED.";
    const user = await updateUsersService(id, data);
    return res.json200(user, message);
};

// Function deleteUser.
async function deleteUser(req, res, next) {
    const { id } = req.params;
    const message = "USERS DELETED.";
    const user = await deleteUsersService(id);
    res.json200(user, message);
    //return res.status(200).json({ message, user });
};

export {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};