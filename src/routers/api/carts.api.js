import CustomRouter from "../../utils/CustomRouter.util.js";
import { getAllCarts, createCart, updateCart, destroyCart, getUserCarts } from "../../controllers/carts.controller.js";

class CartsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    
    init = () => {
        // GET ALL CARTS.
        this.read("/", ["ADMIN"], getAllCarts);
        // GET Cart´s USER.
        this.read("/:user_id", ["USER", "ADMIN"], getUserCarts);
        // POST create a Cart product.
        this.create("/", ["USER", "ADMIN"], createCart);
        // PUT update a Cart product.
        this.update("/:id", ["USER", "ADMIN"], updateCart);
        // DELETE
        this.destroy("/:id", ["USER", "ADMIN"], destroyCart);
    };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();

