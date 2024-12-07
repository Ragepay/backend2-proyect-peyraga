import CustomRouter from "../../utils/CustomRouter.util.js";
import { create, read, update, destroy, readById } from "../../data/mongo/managers/products.manager.js";
import passportCB from "../../middlewares/passportCB.mid.js";

class ProductsApiRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => { // Endpoints de products
        // GET | Get all products. Public.
        this.read("/", ["PUBLIC"], getProducts);
        // GET | Get one product. Public.
        this.read("/:id", ["PUBLIC"], getOneProduct);
        // POST | Create Product. Private: Only Admins.
        this.create("/", ["ADMIN"], passportCB("admin"), createProduct);
        // PUT | Update Product. Private: Only Admins.
        this.update("/:id", ["ADMIN"], passportCB("admin"), updateProduct);
        // Delete | Delete Product. Private: Only Admins.
        this.destroy("/:id", ["ADMIN"], passportCB("admin"), deleteProduct);
    }
}

// Funciones CallBacks.---------------------------------------------------------------------------------------------
// Function getProducts.
async function getProducts(req, res, next) {
    const message = "PRODUCTS FOUND.";
    const product = await read();
    res.json200(product, message);
};

// Function getOneProduct.
async function getOneProduct(req, res, next) {
    const { id } = req.params;
    const message = "PRODUCT FOUND.";
    const product = await readById(id);
    if (product) {
        return res.json200(product, message);
    } else {
        return res.json404(product, message);
    }
}

// Function creatProduct.
async function createProduct(req, res, next) {
    const data = req.body;
    const message = "PRODUCT CREATED";
    const product = await create(data);
    res.json201(product, message);
}

// Function updateProduct.
async function updateProduct(req, res, next) {
    const data = req.body;
    const { id } = req.params;
    const message = "PRODUCT UPDATED";
    const product = await update(id, data);
    if (product) {
        return res.json200(product, message);
    } else {
        return res.json404(product, message);
    }
}

// Function deleteProduct.
async function deleteProduct(req, res, next) {
    const { id } = req.params;
    const message = "PRODUCT DELETED";
    const product = await destroy(id);
    if (product) {
        return res.json200(product, message);
    } else {
        return res.json404(product, message);
    }
}

let productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();

/*
Antes de Custom Router
import { Router } from "express";
//const productsApiRouter = Router();
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
*/