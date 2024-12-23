import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class UserDTO {

    constructor(data) {

        if (persistence !== "MONGO") {
            this._id = crypto.randomBytes(12).toString("hex");
            this.createAt = new Date();
            this.updateAt = new Date();
        }

        this.name = data.name;
        this.email = data.email;
        this.photo = data.photo || "https://via.placeholder.com/150";
        this.emailGoogle = data.emailGoogle;
        this.password = data.password;
        this.role = data.role || "USER";
        this.verifyUser = data.verifyUser || false;
        this.verifyCoder = data.verifyCoder || "1234";
        this.isOnline = data.isOnline || false;
    }
}

export default UserDTO;