import {
    create,
    read,
    update,
    destroy,
    readByData
} from "../data/mongo/managers/carts.manager.js";
import Cart from "../data/mongo/models/cart.model.js";

async function readCartsService() {
    const response = await read();
    return response;
}

async function readOneCartService(data) {
    const response = await readByData(data);
    return response;
}

async function createCartsServcie(data) {
    const cart = await create(data);
    const response = await Cart.findById(cart._id).populate("product_id").populate("user_id");
    return response;
}

async function updateCartsService(id, data) {
    const response = await update(id, data);
    return response;
}

async function deleteCartsService(id) {
    const response = await destroy(id);
    return response;
}

export {
    readCartsService,
    readOneCartService,
    createCartsServcie,
    updateCartsService,
    deleteCartsService
};