import { model, Schema, Types } from "mongoose";

const collection = "carts";
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    products: [
        {
            product_id: { type: Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" }
});

const Cart = model(collection, schema);
export default Cart;