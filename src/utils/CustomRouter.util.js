import { Router } from "express";
import { verifyTokenUtil } from "./token.util.js";
import dao from "../dao/index.factory.js";
import envUtil from "./env.util.js";

const { UsersManager } = dao;

class CustomRouter {
    constructor() {
        this._router = Router();
    }
    // Inciializarlos como Router() de express.
    getRouter = () => this._router;

    // Esta funcion depende de todos los middlewares que necesite ejecutar.
    // mapeamos los middlewares para que se ejecuten cada uno con req, res, next
    _applyCb = (callbacks) => callbacks.map((cb) => async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            return next(error)
        }
    });

    // Metodo de respuestas del servidor.
    responses = (req, res, next) => {
        res.json200 = (response, message) => res.status(200).json({ response, message });
        res.json201 = (response, message) => res.status(201).json({ response, message });
        res.json400 = (message) => res.status(400).json({ error: message });
        res.json401 = () => res.status(401).json({ error: "Bad Auth!" });
        res.json403 = () => res.status(403).json({ error: "Forbidden!" });
        res.json404 = () => res.status(404).json({ error: "Not found!" });
        return next();
    };

    policies = (policies) => async (req, res, next) => {
        try {
            if (policies.includes("PUBLIC")) return next();
            const token = req?.cookies?.token;
            if (!token) return res.json401();
            const data = verifyTokenUtil(token, envUtil.SECRET_KEY);
            const { role, user_id } = data;
            if (!role || !user_id) return res.json401();
            if (
                (policies.includes("USER") && role === "USER") ||
                (policies.includes("ADMIN") && role === "ADMIN")
            ) {
                const user = await UsersManager.readById(user_id);
                if (!user) return res.json401();
                req.user = user;
                return next();
            }
            return res.json403();
        } catch (error) {
            return res.json400(error.message);
        }
    };

    // Metodos que son verbos de http. Y el use para middlewares.
    create = (path, policies, ...cbs) => this._router.post(path, this.responses, this.policies(policies), this._applyCb(cbs));
    read = (path, policies, ...cbs) => this._router.get(path, this.responses, this.policies(policies), this._applyCb(cbs));
    update = (path, policies, ...cbs) => this._router.put(path, this.responses, this.policies(policies), this._applyCb(cbs));
    destroy = (path, policies, ...cbs) => this._router.delete(path, this.responses, this.policies(policies), this._applyCb(cbs));
    use = (path, policies, ...cbs) => this._router.use(path, this.responses, this.policies(policies), this._applyCb(cbs));

};

export default CustomRouter;