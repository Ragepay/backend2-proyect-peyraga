import dao from "../dao/index.factory.js";
import Cart from "../dao/mongo/models/cart.model.js";

const { CartsManager } = dao;

async function readCartsRepository() {
    const response = await CartsManager.read();
    return response;
}

async function readOneCartRepository(data) {
    const response = await CartsManager.readByData(data);
    return response;
}

async function createCartsRepository(data) {
    const cart = await CartsManager.create(data);
    const response = await Cart.findById(cart._id).populate("product_id").populate("user_id");
    return response;
}

async function updateCartsRepository(id, data) {
    const response = await CartsManager.update(id, data);
    return response;
}

async function deleteCartsRepository(id) {
    const response = await CartsManager.destroy(id);
    return response;
}

export {
    readCartsRepository,
    readOneCartRepository,
    createCartsRepository,
    updateCartsRepository,
    deleteCartsRepository
};