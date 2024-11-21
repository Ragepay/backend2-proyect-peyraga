import Users from "../models/users.model.js";
import Manager from "./manager.js";

const usersManager = new Manager(Users);
const { create, read, readByEmail, update, destroy, readById } = usersManager;
export { create, read, readByEmail, update, destroy, readById };