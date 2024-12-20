import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class CartDTO {

    constructor(data) {

        if (persistence !== "MONGO") {
            this._id = crypto.randomBytes(12).toString("hex");
            this.createAt = new Date();
            this.updateAt = new Date();
        }

        this.product_id = data.product_id;
        this.user_id = data.user_id;
        this.quantity = data.quantity;
        this.state = data.state || "reserved";
        
    }
}

export default CartDTO;