import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;
console.log(persistence)

class ProductsDTO {

    constructor(data) {

        if (persistence !== "MONGO") {
            this._id = crypto.randomBytes(12).toString("hex");
            this.createAt = new Date();
            this.updateAt = new Date();
        }

        this.title = data.title;
        this.description = data.description || "desciption";
        this.price = data.price || 10;
        this.stock = data.stock || 10;
        this.category = data.category || "ALL";
        this.photo = data.photo || "https://via.placeholder.com/150";
    }
}

export default ProductsDTO;