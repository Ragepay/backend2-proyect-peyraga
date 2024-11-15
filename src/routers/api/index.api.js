import { Router } from "express";
import productsApiRouter from "./products.api.js";
import cookieApiRouter from "./cookies.api.js";
import sessionApiRouter from "./sessions.api.js";


const apiRouter = Router();

apiRouter.use("/products", productsApiRouter);
apiRouter.use("/cookies", cookieApiRouter );
apiRouter.use("/sessions", sessionApiRouter)

export default apiRouter;