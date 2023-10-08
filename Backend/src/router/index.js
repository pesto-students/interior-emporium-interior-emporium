import { Router } from "express";
import UserRoutes from "./user/index.js";

const routes = new Router();
const PATH = {
  USER: "/users",
};

routes.use(PATH.USER, UserRoutes);

export default routes;
