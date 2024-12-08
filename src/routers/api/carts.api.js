import CustomRouter from "../../utils/CustomRouter.util.js";
import {
    create,
    read,
    update,
    destroy,
} from "../../data/mongo/managers/carts.manager.js";
import Cart from "../../data/mongo/models/cart.model.js";
import { readById } from "../../data/mongo/managers/users.manager.js";

class CartsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        // GET All Carts.
        this.read("/", ["USER", "ADMIN"], readAllCarts);
        // POST
        this.create("/", ["USER", "ADMIN"], createCart);
        // PUT
        this.update("/:id", ["USER", "ADMIN"], updateCart);
        // DELETE
        this.destroy("/:id", ["USER", "ADMIN"], destroyCart);
    };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();

async function createCart(req, res) {
    const message = "CART CREATED";
    const { user_id, products } = req.body;
    const user = await readById(user_id);
    if (!user) {
        const message = "USER NOT FOUND.";
        return res.json400(response, message);
    }
    const newCart = await create(req.body);
    const response = await Cart.findById(newCart._id).populate("product_id").populate("user_id");
    return res.json201(response, message);
}

async function readAllCarts(req, res) {
    const message = "CARTS FOUND";
    const response = await read();
    return res.json200(response, message);
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
