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
        this.phone = data.phone || "0";
        this.password = data.password;
        this.role = data.role || "USER";
        this.verify = data.verify || false;
        this.verifyCode = data.verifyCode;
        this.isOnline = data.isOnline || false;
    }
}

export default UserDTO;