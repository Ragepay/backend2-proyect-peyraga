import dao from "../dao/index.factory.js";
import ProductsDTO from "../dto/products.dto.js";
const { ProductsManager } = dao;

async function readProductsService() {
    const response = await ProductsManager.read();
    return response;
}

async function readOneProductsService(id) {
    const response = await ProductsManager.readById(id);
    return response;
}

async function createProductsService(data) {
    data = new ProductsDTO(data);
    const response = await ProductsManager.create(data);
    return response;
}

async function updateProductsService(id, data) {
    const response = await ProductsManager.update(id, data);
    return response;
}

async function deleteProductsService(id) {
    const response = await ProductsManager.destroy(id);
    return response;
}

export {
    readProductsService,
    readOneProductsService,
    createProductsService,
    updateProductsService,
    deleteProductsService
};