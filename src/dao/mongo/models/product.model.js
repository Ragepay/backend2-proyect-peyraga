import { model, Schema } from "mongoose";

const collection = "products";
// Nombre de la collection: Ingles, plural, minusculas y respresentativo de lo que es.

const schema = new Schema({
    title: { type: String, required: true, index: true },
    photo: { type: String, default: "https://via.placeholder.com/150" },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    category: { type: String, enum: ["celulares", "tablets", "computadoras", "ALL"], default: "ALL" }
});

const Products = model(collection, schema);
export default Products;