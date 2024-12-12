import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCB from "../../middlewares/passportCB.mid.js";
import { getProducts, getOneProduct, deleteProduct, updateProduct, createProduct } from "../../controllers/products.controller.js"

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