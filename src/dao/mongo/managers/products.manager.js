import Products from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Products);
export default productsManager;