import { connect } from "mongoose";
import envUtil from "./env.util.js";

async function dbConnect() {
    try {
        await connect(envUtil.MONGO_LINK);
        console.log("Persistence: MongoDB");
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;
