import { model, Schema } from "mongoose";

const collection = "products";
// Nombre de la collection: Ingles, plural, minusculas y respresentativo de lo que es.

const schema = new Schema({
    title: { type: String, required: true, index: true },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 10 },
    category: { type: String, enum: ["celulares", "tablets", "computadoras"], default: "computadoras" }
});

const Products = model(collection, schema);
export default Products;