import {
    read,
    update,
    destroy,
    readById
} from "../data/mongo/managers/users.manager.js";

async function readUsersService() {
    const response = await read();
    return response;
};

async function readOneUsersService(id) {
    const response = await readById();
    return response;
};

async function updateUsersService(id, data) {
    const response = await update(id, data);
    return response;
};

async function deleteUsersService(id) {
    const response = await destroy(id);
    return response;
};


export {
    readUsersService,
    readOneUsersService,
    updateUsersService,
    deleteUsersService
};