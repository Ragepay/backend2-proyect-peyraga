//import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import CustomRouter from "../utils/CustomRouter.util.js";

class IndexRouter extends CustomRouter {
    constructor() {
        super(/*No necesito pasarle paramaetros a la clas de CustomRouter */);
        this.init();
    }

    init = () => {
        this.use("/api", apiRouter);
        this.use("/", viewsRouter);
    }
}

let indexRouter = new IndexRouter();
indexRouter = indexRouter.getRouter();

//const indexRouter = Router();
//indexRouter.use("/", viewsRouter);
//indexRouter.use("/api", apiRouter);

export default indexRouter;