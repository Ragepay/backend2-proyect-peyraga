import Cart from "../models/product.model.js";
import Manager from "./manager.js";

const cartsManager = new Manager(Cart);
const { create, read, readById, update, destroy } = cartsManager
export { create, read, readById, update, destroy };