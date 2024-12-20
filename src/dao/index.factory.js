import dbConnect from "../utils/mongoConnect.util.js";
import argsUtil from "../utils/args.util.js";



// En base a esta variable me voy a conectar a la persistencia que corresponda.
const { persistence } = argsUtil;

let dao = {};

switch (persistence) {
    case "MEMORY":
        // Debo llenar Dao con las importaciones de los managers de Memory.
        console.log("Persistence: Memory System.");
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
        console.log("Persistence: File System.");
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
        // Debo llenar Dao con las importaciones de los managers de SQL. Y conectarme al SQL
        console.log("Persistence: SQL.");
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