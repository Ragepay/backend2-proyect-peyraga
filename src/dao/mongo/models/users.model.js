import { model, Schema } from "mongoose";

const collection = "users";
// Nombre de la collection: Ingles, plural, minusculas y respresentativo de lo que es.

const schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    photo: { type: String, default: "https://via.placeholder.com/150" },
    phone: { type: String, default: "0" },
    emailGoogle: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER', "PREM", "ADMIN"] },
    verify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true },
    isOnline: { type: Boolean, default: false }
});

const Users = model(collection, schema);
export default Users;