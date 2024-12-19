import Users from "../models/users.model.js";
import Manager from "./manager.js";

const usersManager = new Manager(Users);
export default usersManager;
