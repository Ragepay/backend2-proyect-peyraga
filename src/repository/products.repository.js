import dao from "../dao/index.factory.js";
import ProductsDTO from "../dto/products.dto.js";

const { ProductsManager } = dao;

async function readProductsRepository() {
    const response = await ProductsManager.read();
    return response;
}

async function readOneProductsRepository(id) {
    const response = await ProductsManager.readById(id);
    return response;
}

async function createProductsRepository(data) {
    data = new ProductsDTO(data);
    const response = await ProductsManager.create(data);
    return response;
}

async function updateProductsRepository(id, data) {
    const response = await ProductsManager.update(id, data);
    return response;
}

async function deleteProductsRepository(id) {
    const response = await ProductsManager.destroy(id);
    return response;
}

export {
    readProductsRepository,
    readOneProductsRepository,
    createProductsRepository,
    updateProductsRepository,
    deleteProductsRepository
};