import { Router } from "express";
import { create, read, update, destroy } from "../../data/mongo/managers/products.manager.js";

const productsApiRouter = Router();

// Metodos de llamada a la api products.
productsApiRouter.get("/", async (req, res, next) => {
    try {
        const message = "PRODUCTS FOUND.";
        const response = await read();
        return res.status(200).json({ response, message });
    } catch (error) {
        return next(error);
    };
});

productsApiRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const message = "PRODUCTS CREATED";
        const response = await create(data);
        return res.status(201).json({ response, message });
    } catch (error) {
        return next(error);
    };
});

productsApiRouter.put("/:id", async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params;
        const message = "PRODUCTS UPDATED";
        const response = await update(id, data);
        return res.status(201).json({ response, message });
    } catch (error) {
        return next(error);
    };
});

productsApiRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = "PRODUCTS DELETED";
        const response = await destroy(id);
        return res.status(201).json({ response, message });
    } catch (error) {
        return next(error);
    };
});

export default productsApiRouter;