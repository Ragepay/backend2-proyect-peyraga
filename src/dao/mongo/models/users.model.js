import { model, Schema } from "mongoose";

const collection = "users";
// Nombre de la collection: Ingles, plural, minusculas y respresentativo de lo que es.

const schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    photo: { type: String, default: "https://via.placeholder.com/150" },
    emailGoogle: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER', "PREM", "ADMIN"] },
    verifyUser: { type: Boolean, default: false },
    verifyCoder: { type: String, default: "1234" },
    isOnline: { type: Boolean, default: false }
});

const Users = model(collection, schema);
export default Users;