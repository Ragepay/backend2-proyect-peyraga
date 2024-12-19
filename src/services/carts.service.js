import dao from "../dao/index.factory.js";
import Cart from "../dao/mongo/models/cart.model.js";

const { CartsManager } = dao;

async function readCartsService() {
    const response = await CartsManager.read();
    return response;
}

async function readOneCartService(data) {
    const response = await CartsManager.readByData(data);
    return response;
}

async function createCartsServcie(data) {
    const cart = await CartsManager.create(data);
    const response = await Cart.findById(cart._id).populate("product_id").populate("user_id");
    return response;
}

async function updateCartsService(id, data) {
    const response = await CartsManager.update(id, data);
    return response;
}

async function deleteCartsService(id) {
    const response = await CartsManager.destroy(id);
    return response;
}

export {
    readCartsService,
    readOneCartService,
    createCartsServcie,
    updateCartsService,
    deleteCartsService
};