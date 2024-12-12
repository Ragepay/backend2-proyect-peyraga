import {
    create,
    read,
    readById,
    update,
    destroy
} from "../data/mongo/managers/products.manager.js";

async function readProductsService() {
    const response = await read();
    return response;
}

async function readOneProductsService(id) {
    const response = await readById(id);
    return response;
}

async function createProductsService(data) {
    const response = await create(data);
    return response;
}

async function updateProductsService(id, data) {
    const response = await update(id, data);
    return response;
}

async function deleteProductsService(id) {
    const response = await destroy(id);
    return response;
}

export {
    readProductsService,
    readOneProductsService,
    createProductsService,
    updateProductsService,
    deleteProductsService
};