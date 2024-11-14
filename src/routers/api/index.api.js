import { Router } from "express";
import productsApiRouter from "./products.api.js";
import cookieRouter from "./cookies.api.js";


const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/cookies", cookieRouter )

export default apiRouter;