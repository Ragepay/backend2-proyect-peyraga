import Products from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Products);
const { create, read, update, destroy } = productsManager
export { create, read, update, destroy };

/*
const create = async (data) => {
    try {
        const one = await Products.create(data);
        return one;
    } catch (error) {
        throw error;
    };
};

const read = async () => {
    try {
        const all = await Products.find().lean();
        return all;
    } catch (error) {
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const option = { new: true };
        const one = await Products.findByIdAndUpdate(id, data, option);
        return one;
    } catch (error) {
        throw error;
    };
};

const destroy = async (id) => {
    try {
        const one = await Products.findOneAndDelete(id);
        return one;
    } catch (error) {
        throw error;
    };
};
*/
