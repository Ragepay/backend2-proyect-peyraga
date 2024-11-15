import Users from "../models/users.model.js";
import Manager from "./manager.js";

const usersManager = new Manager(Users);
const { create, read, update, destroy, readOne } = usersManager;
export { create, read, update, destroy, readOne };