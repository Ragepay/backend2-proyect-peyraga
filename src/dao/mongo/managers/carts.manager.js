import Cart from "../models/cart.model.js";
import Manager from "./manager.js";

const cartsManager = new Manager(Cart);
export default cartsManager;

/*
const { create, read, readById, update, destroy } = cartsManager;

const readByData = async (data) => {
    try {
        const one = await Cart.find(data).populate("product_id").populate("user_id");
        return one;
    } catch (error) {
        throw error;
    };
}
export { create, read, readById, update, destroy, readByData };
*/