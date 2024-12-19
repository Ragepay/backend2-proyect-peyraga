import dao from "../dao/index.factory.js";
const { UsersManager } = dao;

async function readUsersService() {
    const response = await UsersManager.read();
    return response;
};

async function readOneUsersService(id) {
    const response = await UsersManager.readById(id);
    return response;
};

async function updateUsersService(id, data) {
    const response = await UsersManager.update(id, data);
    return response;
};

async function deleteUsersService(id) {
    const response = await UsersManager.destroy(id);
    return response;
};


export {
    readUsersService,
    readOneUsersService,
    updateUsersService,
    deleteUsersService
};