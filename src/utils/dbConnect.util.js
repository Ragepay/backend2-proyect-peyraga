import { connect } from "mongoose";
import envUtil from "./env.util.js";

const dbConnect = async () => {
    try {
        await connect(envUtil.MONGO_LINK);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;
