import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import CustomRouter from "../utils/CustomRouter.util.js";

class IndexRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        this.use("/api", ["PUBLIC"], apiRouter);
        this.use("/", ["PUBLIC"], viewsRouter);
    }
}

let indexRouter = new IndexRouter();
export default indexRouter.getRouter();

/*
// Antes de CustomRouter
//import { Router } from "express";
const indexRouter = Router();
indexRouter.use("/", viewsRouter);
indexRouter.use("/api", apiRouter);
*/