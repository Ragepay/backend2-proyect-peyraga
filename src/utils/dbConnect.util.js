import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_LINK);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;
