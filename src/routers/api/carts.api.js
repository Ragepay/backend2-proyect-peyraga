import CustomRouter from "../../utils/CustomRouter.util.js";
import {
    create,
    read,
    update,
    destroy,
    readByData
} from "../../data/mongo/managers/carts.manager.js";
import Cart from "../../data/mongo/models/cart.model.js";


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

async function getAllCarts(req, res) {
    const message = "CARTS FOUND.";
    const response = await read();
    return res.json200(response, message);
}

async function getUserCarts(req, res) {
    const { user_id } = req.params;
    const message = "CARTS FOUND.";
    const response = await readByData({ user_id });
    return res.json200(response, message);
}

async function createCart(req, res) {
    const message = "CART CREATED";
    const data = req.body;
    const cart = await create(data);
    const response = await Cart.findById(cart._id).populate("product_id").populate("user_id");
    return res.json201(response, message);
}

async function updateCart(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "CART UPDATED";
    const response = await update(id, data);
    return res.json200(response, message);
}
async function destroyCart(req, res) {
    const { id } = req.params;
    const message = "CART DELETED";
    const response = await destroy(id);
    return res.json200(response, message);
}
