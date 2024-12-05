import { Router } from "express";
import { create, read, update, destroy, readById } from "../../data/mongo/managers/products.manager.js";
import passportCB from "../../middlewares/passportCB.mid.js";


const productsApiRouter = Router();
// Endpóints de products.-------------------------------------------------------------------------------------------
// GET | Get all products. Public.
productsApiRouter.get("/", getProducts);

// GET | Get one product. Public.
productsApiRouter.get("/:id", getOneProduct);

// POST | Create Product. Private: Only Admins.
productsApiRouter.post("/", passportCB("admin"), createProduct);

// PUT | Update Product. Private: Only Admins.
productsApiRouter.put("/:id", passportCB("admin"), updateProduct);

// Delete | Delete Product. Private: Only Admins.
productsApiRouter.delete("/:id", passportCB("admin"), deleteProduct);

// Funciones CallBacks.---------------------------------------------------------------------------------------------
// Function getProducts.
async function getProducts(req, res, next) {
    try {
        const token = req.token;
        console.log(req.token);
        const message = "PRODUCTS FOUND.";
        const products = await read();
        return res.status(200).json({ message, products, token });
    } catch (error) {
        return next(error);
    };
};

// Function getOneProduct.
async function getOneProduct(req, res, next) {
    try {
        const { id } = req.params;
        const message = "PRODUCT FOUND.";
        const product = await readById(id);
        return res.status(200).json({ message, product });
    } catch (error) {
        return next(error);
    };

}

// Function creatProduct.
async function createProduct(req, res, next) {
    try {
        const data = req.body;
        const message = "PRODUCTS CREATED";
        const product = await create(data);
        return res.status(201).json({ message, product });
    } catch (error) {
        return next(error);
    };
}

// Function updateProduct.
async function updateProduct(req, res, next) {
    try {
        const data = req.body;
        const { id } = req.params;
        const message = "PRODUCTS UPDATED";
        const product = await update(id, data);
        return res.status(201).json({ message, product });
    } catch (error) {
        return next(error);
    };
}

// Function deleteProduct.
async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        const message = "PRODUCTS DELETED";
        const product = await destroy(id);
        return res.status(201).json({ message, product });
    } catch (error) {
        return next(error);
    };
}

export default productsApiRouter;