import dao from "../dao/index.factory.js";
const { UsersManager } = dao;

async function readUsersRepository() {
    const response = await UsersManager.read();
    return response;
};

async function readOneUsersRepository(id) {
    const response = await UsersManager.readById(id);
    return response;
};

async function updateUsersRepository(id, data) {
    const response = await UsersManager.update(id, data);
    return response;
};

async function deleteUsersRepository(id) {
    const response = await UsersManager.destroy(id);
    return response;
};


export {
    readUsersRepository,
    readOneUsersRepository,
    updateUsersRepository,
    deleteUsersRepository
};