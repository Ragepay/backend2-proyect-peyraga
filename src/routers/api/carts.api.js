import CustomRouter from "../../utils/CustomRouter.util.js";
import {
    create,
    read,
    update,
    destroy,
} from "../../data/mongo/managers/carts.manager.js";

class CartsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        // GET | Get one Cart. Public.
        this.read("/:user_id", readCartsFromUser);
        // POST
        this.create("/", createCart);
        // PUT
        this.update("/:id", updateCart);
        // DELETE
        this.destroy("/:id", destroyCart);
    };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();

async function createCart(req, res) {
    const message = "CART CREATED";
    const data = req.body;
    const response = await create(data);
    return res.json201(response, message);
}
async function readCartsFromUser(req, res) {
    const { user_id } = req.params;
    const message = "CARTS FOUND";
    const response = await read({ user_id });
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
