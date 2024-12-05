import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";


const indexRouter = Router();

indexRouter.use("/", viewsRouter);
indexRouter.use("/api", apiRouter);

export default indexRouter;