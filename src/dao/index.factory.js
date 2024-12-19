import envUtil from "../utils/env.util.js";
import dbConnect from "../utils/dbConnect.util.js";


// En base a esta variable me voy a conectar a la persistencia que corresponda.
const { MODE } = envUtil;

let dao = {};

switch (MODE) {
    case "MEMORY":
        // Debo llenar Dao con las importaciones de los managers de Memory.
        console.log("Connected to memory system.");
        const { default: ProductsMaganerMemory } = await import("./memory/ProductsManager.memory.js");
        const { default: UsersMaganerMemory } = await import("./memory/UsersManager.memory.js");
        const { default: CartsMaganerMemory } = await import("./memory/CartsManager.memory.js");
        dao = {
            ProductsManager: ProductsMaganerMemory,
            UsersManager: UsersMaganerMemory,
            CartsManager: CartsMaganerMemory
        };
        break;
    case "FS":
        // Debo llenar Dao con las importaciones de los managers de FileSystem.
        console.log("Connected to file system.");
        const { default: ProductsMaganerFS } = await import("./fs/ProductsManager.fs.js");
        const { default: UsersMaganerFS } = await import("./fs/UsersManager.fs.js");
        const { default: CartsMaganerFS } = await import("./fs/CartsManager.fs.js");
        dao = {
            ProductsManager: ProductsMaganerFS,
            UsersManager: UsersMaganerFS,
            CartsManager: CartsMaganerFS
        };
        break;
        case "SQL":
        // Debo llenar Dao con las importaciones de los managers de SQL
        console.log("Connected to SQL");
        break;
    default:
        // Debo llenar Dao con las importaciones de los managers de MONGO.
        dbConnect();
        const { default: ProductsMaganerMongo } = await import("./mongo/managers/products.manager.js");
        const { default: UsersMaganerMongo } = await import("./mongo/managers/users.manager.js");
        const { default: CartsMaganerMongo } = await import("./mongo/managers/carts.manager.js");
        dao = {
            ProductsManager: ProductsMaganerMongo,
            UsersManager: UsersMaganerMongo,
            CartsManager: CartsMaganerMongo
        };
        break;
}

export default dao;