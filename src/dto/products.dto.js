import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class ProductsDTO {
    constructor(data) {
        persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.description = data.description || "desciption";
        this.price = data.price || 10;
        this.stock = data.stock || 10;
        this.category = data.category || "ALL";
        this.photo = data.photo || "https://via.placeholder.com/150";
        persistence !== "mongo" && (this.createAt = new Date());
        persistence !== "mongo" && (this.updateAt = new Date());
    }
}

export default ProductsDTO;