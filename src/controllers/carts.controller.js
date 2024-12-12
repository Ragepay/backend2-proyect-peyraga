import {
    readCartsService,
    readOneCartService,
    createCartsServcie,
    updateCartsService,
    deleteCartsService
} from "../services/carts.service.js";

async function getAllCarts(req, res) {
    const message = "CARTS FOUND.";
    const response = await readCartsService();
    return res.json200(response, message);
}

async function getUserCarts(req, res) {
    const { user_id } = req.params;
    const message = "CARTS FOUND.";
    const response = await readOneCartService({ user_id });
    return res.json200(response, message);
}

async function createCart(req, res) {
    // Logica del negocio/controlador.
    const message = "CART CREATED";
    const data = req.body;
    // Logica de la gestion del recurso, llamar a la persistencia/modelo.
    const response = createCartsServcie(data);
    return res.json201(response, message);
}

async function updateCart(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "CART UPDATED";
    const response = await updateCartsService(id, data);
    return res.json200(response, message);
}

async function destroyCart(req, res) {
    const { id } = req.params;
    const message = "CART DELETED";
    const response = await deleteCartsService(id);
    return res.json200(response, message);
}

export {
    getAllCarts,
    createCart,
    updateCart,
    destroyCart,
    getUserCarts
};